from celery import shared_task
from django.core.files.base import ContentFile
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.timezone import now
from weasyprint import HTML

from apps.analytics.utils import calculate_analytics
from apps.notifications.utils import create_notification
from apps.product.models import Product
from apps.project.models import Project
from .models import Report

import uuid
from datetime import datetime, time


@shared_task
def generate_report_pdf(report_id, base_url=None):
    """Generate PDF for a report and attach it to the Report record."""
    report = Report.objects.get(id=report_id)
    template = report.template
    project = report.project
    user = report.created_by

    period_start = report.period_start
    period_end = report.period_end

    filters = {}
    start_date = None
    end_date = None
    if period_start and period_end:
        start_date = timezone.make_aware(datetime.combine(period_start, time.min))
        end_date = timezone.make_aware(datetime.combine(period_end, time.max))
        filters["period_start__gte"] = start_date
        filters["period_end__lte"] = end_date

    analytics = calculate_analytics(project.id, filters, period_start, period_end)

    products = Product.objects.filter(project=project)

    product_data = []
    total_royalty_sum = 0

    for product in products:
        total_royalty = product.total_royalty_earnings(start_date, end_date)
        total_impressions = product.total_impressions(start_date, end_date)
        impressions_revenue = product.impressions_revenue(start_date, end_date)

        total_royalty_sum += total_royalty
        total_royalty_sum += impressions_revenue

        product_data.append(
            {
                "title": product.title,
                "total_royalty": total_royalty,
                "total_impressions": total_impressions,
                "impressions_revenue": impressions_revenue,
            }
        )

    logo_url = None
    if template.logo and base_url:
        logo_url = f"{base_url.rstrip('/')}{template.logo.url}"

    context = {
        "project": project,
        "products": product_data,
        "total_royalty_sum": total_royalty_sum,
        "user": user,
        "analytics": analytics,
        "period_start": period_start,
        "period_end": period_end,
        "created_at": now(),
        "template": template,
        "logo_url": logo_url,
        "style": {
            "colors": template.colors or {},
            "typography": template.typography or {},
            "layout": template.layout or {},
            "logo_settings": template.logo_settings or {},
        },
    }

    html_content = render_to_string("report_template.html", context)
    pdf_file = HTML(string=html_content).write_pdf()

    filename = report.filename or f"rx_report_{uuid.uuid4().hex}.pdf"
    report.file.save(filename, ContentFile(pdf_file))

    create_notification(user, "Your requested report was successfully created!")
    return True
