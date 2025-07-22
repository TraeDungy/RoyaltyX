from datetime import date

import openai
from celery import shared_task
from django.conf import settings

from apps.project.models import Project

from .models import AnalyticsForecast
from .utils import calculate_analytics


@shared_task
def generate_project_forecast(
    project_id: int, period_start: str | None = None, period_end: str | None = None
) -> str:
    """Generate a forecast for a project using OpenAI and store it."""

    project = Project.objects.get(id=project_id)

    start_date = date.fromisoformat(period_start) if period_start else None
    end_date = date.fromisoformat(period_end) if period_end else None

    filters = {}
    if start_date and end_date:
        filters["period_start__gte"] = start_date
        filters["period_end__lte"] = end_date

    analytics = calculate_analytics(project_id, filters, start_date, end_date)

    prompt = (
        "You are an analytics expert. Based on the following historical data, "
        "provide a concise forecast of future revenue and trends:\n" + str(analytics)
    )

    api_key = settings.OPENAI_API_KEY
    client = openai.OpenAI(api_key=api_key) if api_key else openai.OpenAI()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
    )

    forecast_text = response.choices[0].message.content.strip()

    AnalyticsForecast.objects.create(
        project=project,
        period_start=start_date,
        period_end=end_date,
        forecast=forecast_text,
    )

    return forecast_text

