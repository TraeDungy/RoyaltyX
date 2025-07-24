from apps.sources.plugins import SourcePlugin, register_plugin
from apps.sources.utils.tiktok_sync import fetch_tiktok_stats, fetch_tiktok_videos


class TikTokPlugin(SourcePlugin):
    platform = "tiktok"

    def fetch_videos(self) -> None:
        fetch_tiktok_videos()

    def fetch_stats(self) -> None:
        fetch_tiktok_stats()


plugin = TikTokPlugin()
register_plugin(plugin)
