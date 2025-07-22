from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.project.models import ProjectUser

from .models import WhiteLabelConfig
from .serializers import WhiteLabelConfigSerializer


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def white_label_config_view(request):
    user = request.user
    project_id = user.currently_selected_project_id

    if not project_id:
        return Response(
            {"error": "Select a project first."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        project_user = ProjectUser.objects.get(project_id=project_id, user=user)
    except ProjectUser.DoesNotExist:
        return Response(
            {"error": "User is not part of this project."},
            status=status.HTTP_403_FORBIDDEN,
        )

    config, _ = WhiteLabelConfig.objects.get_or_create(project_id=project_id)

    if request.method == "GET":
        serializer = WhiteLabelConfigSerializer(config)
        return Response(serializer.data)

    if project_user.role != ProjectUser.PROJECT_USER_ROLE_OWNER:
        return Response(
            {"error": "Only owners can update white label settings."},
            status=status.HTTP_403_FORBIDDEN,
        )

    serializer = WhiteLabelConfigSerializer(config, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
