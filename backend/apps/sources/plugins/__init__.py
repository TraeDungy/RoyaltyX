from importlib import import_module
from typing import Dict, List, Optional


class SourcePlugin:
    """Base class for source integration plugins."""

    #: Unique platform name, e.g. ``"youtube"``
    platform: str

    def fetch_videos(self) -> None:
        raise NotImplementedError

    def fetch_stats(self) -> None:
        raise NotImplementedError


registry: Dict[str, SourcePlugin] = {}


def register_plugin(plugin: SourcePlugin) -> None:
    """Register a plugin so tasks can discover it."""
    registry[plugin.platform] = plugin


def get_plugin(name: str) -> Optional[SourcePlugin]:
    return registry.get(name)


def load_plugins(paths: List[str]) -> None:
    """Import plugin modules from dotted paths."""
    for path in paths:
        module = import_module(path)
        plugin = getattr(module, "plugin", None)
        if plugin is not None:
            register_plugin(plugin)
