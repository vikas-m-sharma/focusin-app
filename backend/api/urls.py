from django.urls import path
from .views import GoogleLoginView, SignupView  # ✅ only import what exists

urlpatterns = [
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path("signup/", SignupView.as_view(), name="signup"),

]
