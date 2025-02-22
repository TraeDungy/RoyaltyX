from rest_framework import serializers

from .models import Product, ProductSale


class ProductSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSale
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    sales = ProductSaleSerializer(many=True, read_only=True, source='productsale_set')

    class Meta:
        model = Product
        fields = '__all__'
