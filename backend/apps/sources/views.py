from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Source
from .serializers import SourceSerializer


class SourceListCreateView(APIView):
    """
    GET: Returns a list of sources for this project.
    POST: Create a new source
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        sources = Source.objects.filter(
            project_id=request.user.currently_selected_project_id
        )
        serializer = SourceSerializer(sources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=SourceSerializer,
    )
    def post(self, request):
        data = request.data.copy()
        data["project"] = request.user.currently_selected_project_id
        serializer = SourceSerializer(data=data)
        if serializer.is_valid():
            source = serializer.save()
            return Response(
                SourceSerializer(source).data, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
