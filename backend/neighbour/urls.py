# neighbour/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import ComplaintViewSet

router = DefaultRouter()
router.register(r'complaints', ComplaintViewSet, basename='complaint')  # Will serve /api/complaints/

urlpatterns = [
    path('api/data/', views.sample_data, name='sample-data'),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('add-product/', views.add_product, name='add-product'),
    path('all-products/', views.all_products, name='all-products'),
    path('complaints/create/', views.ComplaintCreateView.as_view(), name='create-complaint'),  # optional, for form-based complaint submission
    path('api/', include(router.urls)),  # includes /api/complaints/ etc.
]
