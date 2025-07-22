import logging

from rest_framework.permissions import BasePermission

from .models import ProjectUser

logger = logging.getLogger(__name__)


class ProjectRolePermission(BasePermission):
    """Base permission that checks the user's role in the current project."""

    allowed_roles = []

    def has_permission(self, request, view):
        project_id = getattr(request.user, "currently_selected_project_id", None)
        if not project_id:
            return False
        try:
            project_user = ProjectUser.objects.get(
                project_id=project_id, user=request.user
            )
        except ProjectUser.DoesNotExist:
            return False
        request.project_user_role = project_user.role
        return project_user.role in self.allowed_roles


class IsProjectOwner(ProjectRolePermission):
    allowed_roles = [ProjectUser.PROJECT_USER_ROLE_OWNER]


class IsProjectEditorOrAbove(ProjectRolePermission):
    allowed_roles = [
        ProjectUser.PROJECT_USER_ROLE_OWNER,
        ProjectUser.PROJECT_USER_ROLE_EDITOR,
        ProjectUser.PROJECT_USER_ROLE_PRODUCER,
    ]


class IsProjectMember(ProjectRolePermission):
    allowed_roles = [
        ProjectUser.PROJECT_USER_ROLE_OWNER,
        ProjectUser.PROJECT_USER_ROLE_PRODUCER,
        ProjectUser.PROJECT_USER_ROLE_EDITOR,
        ProjectUser.PROJECT_USER_ROLE_VIEWER,
    ]
