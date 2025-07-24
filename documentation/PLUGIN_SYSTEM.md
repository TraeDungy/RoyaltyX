# Integration Plugin System

RoyaltyX discovers source integrations via Python modules specified in the
`SOURCE_PLUGIN_APPS` setting. Each module must expose a `plugin` instance of a
class derived from `SourcePlugin`.

```
# my_app/my_plugin.py
from apps.sources.plugins import SourcePlugin, register_plugin

class MyPlugin(SourcePlugin):
    platform = "example"

    def fetch_videos(self):
        # download new videos
        ...

    def fetch_stats(self):
        # update statistics
        ...

plugin = MyPlugin()
register_plugin(plugin)
```

Add the module path to `SOURCE_PLUGIN_APPS` in your Django settings or via the
`SOURCE_PLUGIN_APPS` environment variable. When the application starts, each
plugin is loaded and two Celery beat tasks are created:

- `<plugin>-fetch-videos` → calls `fetch_videos()`
- `<plugin>-fetch-stats`  → calls `fetch_stats()`

This allows third parties to ship integrations as separate packages without
modifying RoyaltyX core code.
