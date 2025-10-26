from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def home(request):
    return JsonResponse({"message": "Welcome to FocusIn Backend API 🚀"})


urlpatterns = [
    path('', home),  # 👈 Add this line
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
