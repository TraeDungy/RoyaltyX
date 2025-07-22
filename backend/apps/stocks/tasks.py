from celery import shared_task

from .utils.stock_service import update_all_stock_prices


@shared_task
def task_fetch_stock_prices():
    update_all_stock_prices()
