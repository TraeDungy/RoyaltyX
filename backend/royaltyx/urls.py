from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('apps.authentication.urls')),
    path('users/', include('apps.user.urls')),
    path('projects/', include('apps.project.urls')),
    path('data_imports/', include('apps.data_imports.urls')),
    path('products/', include('apps.product.urls')),
]
