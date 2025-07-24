import json
import logging
from typing import Any, Dict

import openai
from django.conf import settings

logger = logging.getLogger(__name__)


def generate_insights(analytics_data: Dict[str, Any]) -> str:
    """Generate smart insights using OpenAI based on analytics data."""
    api_key = getattr(settings, "OPENAI_API_KEY", None)
    if not api_key:
        logger.warning("OPENAI_API_KEY not configured")
        return ""

    try:
        client = openai.OpenAI(api_key=api_key)
        prompt = (
            "Provide a concise summary of the following analytics data "
            "highlighting any interesting trends or anomalies:\n" +
            json.dumps(analytics_data)
        )
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
        )
        return response.choices[0].message.content.strip()
    except Exception as exc:
        logger.error("Failed to generate insights via OpenAI: %s", exc)
        return ""
