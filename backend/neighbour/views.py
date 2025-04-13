from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from .models import Product
import json

User = get_user_model()

# ✅ Test view
def sample_data(request):
    return JsonResponse({"message": "Hello from Django!"})

# ✅ Register user
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
            return JsonResponse({
                'message': 'Login successful',
                'username': user.username,
                'user_id': user.id  # ✅ Add this so frontend can save it
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)


@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')  
        name = request.POST.get('name')
        condition = request.POST.get('condition')
        price = request.POST.get('price')
        image = request.FILES.get('image')

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        Product.objects.create(user=user, name=name, condition=condition, price=price, image=image)
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
