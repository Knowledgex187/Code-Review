from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from djangorestframework_camel_case.parser import (
    CamelCaseFormParser,
    CamelCaseJSONParser,
    CamelCaseMultiPartParser,
)
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model, authenticate, login
from django.utils import timezone
from datetime import timedelta
from Serializer import SignUpSerializer
import logging

logger = logging.getLogger("documents.views.auth")

User = get_user_model()


class SignUpView(APIView):
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer
    parser_classes = [
        CamelCaseMultiPartParser,
        CamelCaseFormParser,
        CamelCaseJSONParser,
    ]

    def get(self, request, token, *args, **kwargs):

        try:
            user = User.objects.get(
                invitation_token=token,
                is_invited=True,
                is_active=False,
                created_at__gte=timezone.now() - timedelta(days=7),
            )
            return Response(
                {
                    "status": "success",
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                status=status.HTTP_200_OK,
            )

        except User.DoesNotExist:
            return Response(
                {
                    "status": "error",
                    "message": "user not found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request, token, *args, **kwargs):

        # verify token again
        try:
            user = User.objects.get(
                invitation_token=token,
                is_invited=True,
                is_active=False,
                created_at__gte=timezone.now() - timedelta(days=7),
            )

            serializer = self.serializer_class(
                data=request.data, context={"user": user}
            )

            if not serializer.is_valid():
                logger.error(
                    f"Validation error: {serializer.errors.get('non_field_errors')}"
                )
                return Response(
                    {
                        "status": "error",
                        "code": "INVALIDATION_ERROR",
                        "message": "validation failed",
                        "detail": serializer.errors.get("non_field_errors"),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            password = serializer.validated_data["password"]
            email = serializer.validated_data["email"]

            # Set password and activate user
            user.set_password(password)
            user.is_active = True
            user.save()  # save() returns None, so don't assign it

            # Auto login
            authenticated_user = authenticate(email=email, password=password)
            if authenticated_user is not None:
                login(request, authenticated_user)
                logger.info(
                    f"User successfully signed up and logged in: {email} - "
                    f"{user.first_name} {user.last_name}."
                )
            else:
                logger.error(f"Authentication failed after signup for: {email}")

            return Response(
                {"status": "success", "message": "Successfully logged in."},
                status=status.HTTP_200_OK,
            )

        except User.DoesNotExist:
            logger.error("Invalid or expired token.")
            return Response(
                {"status": "error", "message": "Invalid or expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )
