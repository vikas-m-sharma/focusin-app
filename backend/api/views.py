from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.db import connection
from django.contrib.auth.hashers import make_password
from .models import User
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import generics


class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "Missing Google token"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(token, requests.Request())
            email = idinfo.get("email")
            name = idinfo.get("name")

            # You can add logic here to create or fetch a user from DB
            # Example: User.objects.get_or_create(email=email)

            return Response({
                "message": "Google login successful",
                "email": email,
                "name": name
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("Google login failed:", e)
            return Response({"error": "Invalid Google token"}, status=status.HTTP_400_BAD_REQUEST)

# ---------------- EMAIL SIGNUP VIEW ----------------


class SignupView(APIView):
    def post(self, request):
        try:
            name = request.data.get("name")
            email = request.data.get("email")
            password = request.data.get("password")

            print("📩 Received signup:", name, email)

            if not email or not password:
                return Response(
                    {"error": "Email and password are required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Check if user already exists
            existing_user = User.objects.filter(email=email).first()
            print("🔍 Existing user found:", existing_user)

            if existing_user:
                return Response(
                    {"error": "User already exists"},
                    status=status.HTTP_409_CONFLICT
                )

            # ✅ Create new user properly
            new_user = User.objects.create(
                name=name,
                email=email,
                password=make_password(password)
            )
            new_user.save()
            print("✅ User created successfully:", new_user.email)

            return Response(
                {"message": "Account created successfully"},
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            print("❌ Signup failed:", str(e))
            return Response(
                {"error": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.filter(email=email).first()

            if user is None:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            if not user.check_password(password):
                return Response({"error": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)

            # ✅ Return user info after successful login
            return Response({
                "message": "Login successful ✅",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                }
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print("❌ Login error:", e)
            return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get("user_id")
        if user_id:
            return Task.objects.filter(user_id=user_id)
        return Task.objects.all()

    def perform_create(self, serializer):
        """Ensure user is linked properly when saving a task"""
        user_id = self.request.data.get("user")

        if not user_id:
            raise ValueError("User ID is required to create a task")

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise ValueError(f"No user found with ID {user_id}")

        serializer.save(user=user)
