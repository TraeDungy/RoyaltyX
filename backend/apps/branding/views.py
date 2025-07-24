from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.admin_panel.views import has_admin_access

from .models import PageCustomization
from .serializers import PageCustomizationSerializer


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def page_customization_detail(request, page_name):
    if not has_admin_access(request.user):
        return Response(
            {"error": "You do not have permission to perform this action."},
            status=status.HTTP_403_FORBIDDEN,
        )

    customization, _ = PageCustomization.objects.get_or_create(page=page_name)

    if request.method == "GET":
        serializer = PageCustomizationSerializer(customization)
        return Response(serializer.data)

    serializer = PageCustomizationSerializer(
        customization,
        data=request.data,
        partial=True,
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
