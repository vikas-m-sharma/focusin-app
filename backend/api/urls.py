from django.urls import path
from .views import SignupView, GoogleLoginView, LoginView, TaskListCreateView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("google-login/", GoogleLoginView.as_view(), name="google-login"),
    path("tasks/", TaskListCreateView.as_view(), name="tasks"),
]
