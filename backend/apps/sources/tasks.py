import logging
from celery import shared_task

from apps.sources.utils.tiktok_sync import fetch_tiktok_stats, fetch_tiktok_videos
from apps.sources.utils.twitch_sync import fetch_twitch_stats, fetch_twitch_videos
from apps.sources.utils.vimeo_sync import fetch_vimeo_stats, fetch_vimeo_videos


logger = logging.getLogger(__name__)

from .utils.youtube import fetch_youtube_stats, fetch_youtube_videos


@shared_task
def task_fetch_youtube_videos():
    """Fetch newly uploaded videos from connected YouTube channels."""
    logger.info("Running task for fetching YouTube videos.")
    fetch_youtube_videos()


@shared_task
def task_fetch_youtube_stats():
    """Update statistics for existing YouTube videos."""
    logger.info("Running task for fetching YouTube stats.")
    fetch_youtube_stats()

@shared_task
def task_fetch_tiktok_videos():
    """Fetch newly uploaded videos from connected TikTok accounts."""
    logger.info("Running task for fetching TikTok videos.")
    fetch_tiktok_videos()


@shared_task
def task_fetch_tiktok_stats():
    """Update statistics for existing TikTok videos."""
    logger.info("Running task for fetching TikTok stats.")
    fetch_tiktok_stats()


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
