from django.db.models import Sum
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.project.models import ProjectUser
from apps.project.permissions import IsProjectMember

from .models import Product, ProductUser
from .serializers import ProductSerializer, ProductUserSerializer


class ProductListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsProjectMember]

    def get(self, request):
        user = request.user
        currently_selected_project_id = user.currently_selected_project_id

        try:
            project_user = ProjectUser.objects.get(
                project_id=currently_selected_project_id, user=user
            )
        except ProjectUser.DoesNotExist:
            return Response(
                {"error": "User is not part of this project."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if project_user.role == ProjectUser.PROJECT_USER_ROLE_OWNER:
            products = Product.objects.filter(project_id=currently_selected_project_id)
        elif project_user.role in [
            ProjectUser.PROJECT_USER_ROLE_PRODUCER,
            ProjectUser.PROJECT_USER_ROLE_EDITOR,
        ]:
            products = Product.objects.filter(
                project_id=currently_selected_project_id,
                productuser__user=user,
            )
        else:
            products = Product.objects.filter(project_id=currently_selected_project_id)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        if (
            getattr(request, "project_user_role", None)
            == ProjectUser.PROJECT_USER_ROLE_VIEWER
        ):
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated, IsProjectMember])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        if (
            getattr(request, "project_user_role", None)
            == ProjectUser.PROJECT_USER_ROLE_VIEWER
        ):
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        if (
            getattr(request, "project_user_role", None)
            == ProjectUser.PROJECT_USER_ROLE_VIEWER
        ):
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )
        product.delete()
        return Response(
            {"message": "Product deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated, IsProjectMember])
def product_user_list_create(request, product_id):
    product = Product.objects.get(id=product_id)

    if request.method == "GET":
        users = product.users
        serializer = ProductUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        if (
            getattr(request, "project_user_role", None)
            == ProjectUser.PROJECT_USER_ROLE_VIEWER
        ):
            return Response(
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = ProductUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated, IsProjectMember])
class ProductUserDetail(APIView):
    def get_object(self, product_id, user_id):
        try:
            product = Product.objects.get(id=product_id)
            product_user = ProductUser.objects.get(product=product, user_id=user_id)
            return product_user
        except ProductUser.DoesNotExist:
            return None

    def get(self, request, product_id, user_id):
        product_user = self.get_object(product_id, user_id)
        if product_user is not None:
            serializer = ProductUserSerializer(product_user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"detail": "ProductUser not found."}, status=status.HTTP_404_NOT_FOUND
        )

    def put(self, request, product_id, user_id):
        product_user = self.get_object(product_id, user_id)
        if product_user is not None:
            if (
                getattr(request, "project_user_role", None)
                == ProjectUser.PROJECT_USER_ROLE_VIEWER
            ):
                return Response(
                    {"detail": "Permission denied."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            serializer = ProductUserSerializer(product_user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "ProductUser not found."}, status=status.HTTP_404_NOT_FOUND
        )

    def delete(self, request, product_id, user_id):
        product_user = self.get_object(product_id, user_id)
        if product_user is not None:
            if (
                getattr(request, "project_user_role", None)
                == ProjectUser.PROJECT_USER_ROLE_VIEWER
            ):
                return Response(
                    {"detail": "Permission denied."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            product_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(
            {"detail": "ProductUser not found."}, status=status.HTTP_404_NOT_FOUND
        )


@api_view(http_method_names=["GET"])
def getTopPerformingContentByImpressions(request):
    products = (
        Product.objects.filter(project_id=request.user.currently_selected_project_id)
        .annotate(total_impressions=Sum("productimpressions__impressions"))
        .filter(total_impressions__gt=0)
        .order_by("-total_impressions")[:10]
    )
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(http_method_names=["GET"])
def getTopPerformingContentBySales(request):
    products = (
        Product.objects.filter(project_id=request.user.currently_selected_project_id)
        .annotate(total_sales=Sum("productsale__royalty_amount"))
        .filter(total_sales__gt=0)
        .order_by("-total_sales")[:10]
    )
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
