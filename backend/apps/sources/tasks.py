import logging
from celery import shared_task

from apps.sources.utils.tiktok_sync import fetch_tiktok_stats, fetch_tiktok_videos
from apps.sources.utils.twitch_sync import fetch_twitch_stats, fetch_twitch_videos
from apps.sources.utils.vimeo_sync import fetch_vimeo_stats, fetch_vimeo_videos
from apps.sources.plugins import get_plugin


logger = logging.getLogger(__name__)


@shared_task
def run_plugin_fetch_videos(plugin_name: str) -> None:
    """Run ``fetch_videos`` for the given plugin."""
    plugin = get_plugin(plugin_name)
    if not plugin:
        logger.error("No plugin registered for %s", plugin_name)
        return
    logger.info("Running video sync for %s", plugin_name)
    plugin.fetch_videos()


@shared_task
def run_plugin_fetch_stats(plugin_name: str) -> None:
    """Run ``fetch_stats`` for the given plugin."""
    plugin = get_plugin(plugin_name)
    if not plugin:
        logger.error("No plugin registered for %s", plugin_name)
        return
    logger.info("Running stats sync for %s", plugin_name)
    plugin.fetch_stats()


@shared_task
def task_fetch_youtube_videos():
    """Fetch newly uploaded videos from connected YouTube channels."""
    run_plugin_fetch_videos("youtube")


@shared_task
def task_fetch_youtube_stats():
    """Update statistics for existing YouTube videos."""
    run_plugin_fetch_stats("youtube")

@shared_task
def task_fetch_tiktok_videos():
    """Fetch newly uploaded videos from connected TikTok accounts."""
    run_plugin_fetch_videos("tiktok")


@shared_task
def task_fetch_tiktok_stats():
    """Update statistics for existing TikTok videos."""
    run_plugin_fetch_stats("tiktok")


@shared_task
def task_fetch_twitch_videos():
    """Fetch newly streamed videos from connected Twitch channels."""
    logger.info("Running task for fetching Twitch videos.")
    fetch_twitch_videos()


@shared_task
def task_fetch_twitch_stats():
    """Update statistics for existing Twitch videos."""
    logger.info("Running task for fetching Twitch stats.")
    fetch_twitch_stats()


@shared_task
def task_fetch_vimeo_videos():
    logger.info("Running task for fetching Vimeo videos.")
    fetch_vimeo_videos()


@shared_task
def task_fetch_vimeo_stats():
    logger.info("Running task for fetching Vimeo stats.")
    fetch_vimeo_stats()
