from rest_framework import serializers

from .models import Product, ProductImpressions, ProductSale


class ProductSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSale
        fields = '__all__'

class ProductImpressionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImpressions
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    sales = ProductSaleSerializer(many=True, read_only=True, source='productsale_set')
    impressions = ProductImpressionsSerializer(many=True, read_only=True, source='productimpressions_set')

    class Meta:
        model = Product
        fields = '__all__'
