from django.urls import path
from . import views  
from .views import sample_data, register_user, login_user, add_product  

urlpatterns = [
    path('api/data/', sample_data, name='sample-data'),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('add-product/', add_product, name='add-product'),
    path('all-products/', views.all_products),
]
