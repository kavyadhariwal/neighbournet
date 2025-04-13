
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

class Product(models.Model):
    CONDITION_CHOICES = (
        ('new', 'New'),
        ('used', 'Used'),
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  # who added the product
    name = models.CharField(max_length=100)
    condition = models.CharField(max_length=10, choices=CONDITION_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} by {self.user.username}"