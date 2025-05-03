# project/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('neighbour.urls')),              
    path('auth/', include('djoser.urls')),            #simplify authentication
    path('auth/', include('djoser.urls.jwt')),        #(JSON Web Token) is a secure way to handle authentication
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
