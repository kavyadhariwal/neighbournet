from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import ComplaintViewSet, ComplaintCreateView

router = DefaultRouter()
router.register(r'complaints', ComplaintViewSet, basename='complaint')

urlpatterns = [
    path('api/data/', views.sample_data, name='sample-data'),
    path('api/register/', views.register_user, name='register'),
    path('api/login/', views.login_user, name='login'),
    path('api/add-product/', views.add_product, name='add-product'),
    path('api/all-products/', views.all_products, name='all-products'),
    path('api/complaints/create/', ComplaintCreateView.as_view(), name='create-complaint'),
    path('api/profile/', views.user_profile, name='profile'),
    path('api/products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),  # Add this line
    path('api/', include(router.urls)),  # for /api/complaints/
]
