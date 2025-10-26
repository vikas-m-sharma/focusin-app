from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.db import connection
from django.contrib.auth.hashers import make_password
from .models import User


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
