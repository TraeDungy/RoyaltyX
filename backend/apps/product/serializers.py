from rest_framework import serializers

from apps.sources.serializers import SourceSerializer
from apps.user.models import User
from apps.user.serializers import UserSerializer

from .models import (
    Product,
    ProductImage,
    ProductImpressions,
    ProductSale,
    ProductUser,
)


class ProductUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True
    )
    user_details = UserSerializer(source="user", read_only=True)

    class Meta:
        model = ProductUser
        fields = ["id", "product", "user", "user_details", "producer_fee"]


class ProductSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSale
        fields = "__all__"


class ProductImpressionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImpressions
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    sales = ProductSaleSerializer(many=True, read_only=True, source="productsale_set")
    users = ProductUserSerializer(many=True, read_only=True, source="productuser_set")
    source = SourceSerializer(many=False, read_only=True)
    impressions = ProductImpressionsSerializer(
        many=True, read_only=True, source="productimpressions_set"
    )

    class Meta:
        model = Product
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"
