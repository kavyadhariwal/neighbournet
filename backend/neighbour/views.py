from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, action
from django.contrib.auth import get_user_model
from .models import Product
from rest_framework.permissions import IsAdminUser
import json
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from .models import Complaint
from .serializers import ComplaintSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Product,CustomUser
from .serializers import ProductSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .serializers import UserSerializer

User = get_user_model()

def sample_data(request):
    return JsonResponse({"message": "Hello from Django!"})


@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'message': 'User registered successfully'})


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return JsonResponse({
                'message': 'Login successful',
                'token': token.key,
                'username': user.username,
                'user_id': user.id
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)



@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        # Get token from Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Token '):
            return JsonResponse({'error': 'Authorization header missing or invalid'}, status=401)
        
        token_key = auth_header.split(' ')[1]

        try:
            token = Token.objects.get(key=token_key)
            user = token.user
        except Token.DoesNotExist:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        name = request.POST.get('name')
        condition = request.POST.get('condition')
        price = request.POST.get('price')
        image = request.FILES.get('image')

        if not all([name, condition, price]):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        Product.objects.create(
            user=user,
            name=name,
            condition=condition,
            price=price,
            image=image
        )

        return JsonResponse({'message': 'Product added successfully'})

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)

@csrf_exempt
def all_products(request):
    products = Product.objects.all()
    product_list = []
    for p in products:
        product_list.append({
            'id': p.id,
            'name': p.name,
            'condition': p.condition,
            'price': p.price,
            'image': p.image.url if p.image else '',
            'user': p.user.username
        })
    return JsonResponse(product_list, safe=False)


class ComplaintCreateView(generics.CreateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer


class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by('-created_at')
    serializer_class = ComplaintSerializer

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        try:
            complaint = self.get_object()
            new_status = request.data.get('status', None)
            if not new_status:
                return Response({'error': 'Status is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            valid_statuses = ['Pending', 'Solved']
            if new_status not in valid_statuses:
                return Response({'error': f"Invalid status. Valid statuses are: {', '.join(valid_statuses)}"},
                                status=status.HTTP_400_BAD_REQUEST)
            
            complaint.status = new_status
            complaint.save()
            return Response({'status': 'updated', 'new_status': complaint.status}, status=status.HTTP_200_OK)
        
        except Complaint.DoesNotExist:
            return Response({'error': 'Complaint not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    products = Product.objects.filter(user=user).order_by('-created_at')
    product_data = ProductSerializer(products, many=True).data

    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'products': product_data
    })



class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  

   
    def delete(self, request, pk, format=None):
        try:
            product = Product.objects.get(pk=pk, user=request.user)
            product.delete()
            return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
   
    def patch(self, request, pk, format=None):
        try:
            product = Product.objects.get(pk=pk, user=request.user)
            data = request.data
            serializer = ProductSerializer(product, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Product updated successfully", "product": serializer.data}, status=status.HTTP_200_OK)
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def admin_dashboard_stats(request):
    total_users = User.objects.count()
    total_products = Product.objects.count()
    total_complaints = Complaint.objects.count()

    return Response({
        "total_users": total_users,
        "total_products": total_products,
        "total_complaints": total_complaints
    })

@api_view(['GET'])
def latest_complaints(request):
    complaints = Complaint.objects.order_by('-id') 
    data = [
        {
            "id": c.id,
            "name": c.name,
            "category": c.category,
            "complaint": c.complaint,
            "status": c.status,
           
        }
        for c in complaints
    ]
    return Response(data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def all_users(request):
#     users = CustomUser.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data)


@api_view(['GET'])
def all_users(request):
    users = CustomUser.objects.order_by('-id') 
    data = [
        {
            "id": u.id,
            "username": u.username,
             "email": u.email,
           
        }
        for u in users
    ]
    return Response(data)