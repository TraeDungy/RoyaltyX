from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("authentication/", include("apps.authentication.urls")),
    path("users/", include("apps.user.urls")),
    path("projects/", include("apps.project.urls")),
    path("data_imports/", include("apps.data_imports.urls")),
    path("products/", include("apps.product.urls")),
    ## API documentation urls
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
