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


class SourceDetailView(APIView):
    """
    GET: Returns a single source
    PUT: Update a source
    DELETE: Delete a source
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            source = Source.objects.get(
                pk=pk, project_id=request.user.currently_selected_project_id
            )
            serializer = SourceSerializer(source)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Source.DoesNotExist:
            return Response(
                {"detail": "Source not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @extend_schema(
        request=SourceSerializer,
    )
    def put(self, request, pk):
        try:
            source = Source.objects.get(
                pk=pk, project_id=request.user.currently_selected_project_id
            )
            serializer = SourceSerializer(source, data=request.data, partial=True)
            if serializer.is_valid():
                updated_source = serializer.save()
                return Response(
                    SourceSerializer(updated_source).data, status=status.HTTP_200_OK
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Source.DoesNotExist:
            return Response(
                {"detail": "Source not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, pk):
        try:
            source = Source.objects.get(
                pk=pk, project_id=request.user.currently_selected_project_id
            )
            source.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Source.DoesNotExist:
            return Response(
                {"detail": "Source not found"}, status=status.HTTP_404_NOT_FOUND
            )
