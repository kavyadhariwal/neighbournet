# neighbour/serializers.py
#Serializers in Django are used to convert complex data types (like Django models) into JSON format for APIs
from rest_framework import serializers
from .models import Complaint
from .models import Product
from django.conf import settings
from django.contrib.auth.models import User

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
     class Meta:
        model = Product
        fields = ['id', 'name', 'condition', 'price', 'created_at', 'image']
        read_only_fields = ['user']
     def get_image(self, obj):
        # If the product has an image, return the full URL
        if obj.image:
            return settings.MEDIA_URL + 'product_images/' + obj.image.name
        return None