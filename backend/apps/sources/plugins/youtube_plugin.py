from apps.sources.plugins import SourcePlugin, register_plugin
from apps.sources.utils.youtube import fetch_youtube_stats, fetch_youtube_videos


class YouTubePlugin(SourcePlugin):
    platform = "youtube"

    def fetch_videos(self) -> None:
        fetch_youtube_videos()

    def fetch_stats(self) -> None:
        fetch_youtube_stats()


plugin = YouTubePlugin()
register_plugin(plugin)
