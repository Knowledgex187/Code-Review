from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password


User = get_user_model()

# Special Characters
SpecialSym = [
    "!",
    "£",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "?",
    "@",
    ";",
    ":",
    "~",
    "`",
    "¬",
    "-",
    "=",
    "_",
    "+",
]


class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=254, min_length=4, allow_null=False)
    password = serializers.CharField(
        min_length=8, write_only=True, style={"input_type": "password"}
    )
    password_1 = serializers.CharField(
        min_length=8, write_only=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ["email", "password", "password_1"]

    def validate(self, data):

        #  local variables
        email = data.get("email")
        password = data.get("password")
        password_1 = data.get("password_1")

        # Gets user object from database
        user = self.context.get("user")

        # user object comes from details submitted at Project Manager creation form and data, comes from formData of the signup form received from the frontend.
        if user and email:
            if email != user.email:
                raise serializers.ValidationError(
                    "Email does not match the email assigned to you."
                )

        try:
            validate_password(password)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)

        if password != password_1:
            raise serializers.ValidationError("Passwords do not match.")

        if " " in password:
            raise serializers.ValidationError("No spaces allowed in password")

        if len(password) < 8:
            raise serializers.ValidationError(
                "Password must be more than 8 characters."
            )

        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError(
                "Password must contain at least one digit."
            )

        if not any(char in SpecialSym for char in password):
            raise serializers.ValidationError(
                "Password must contain at least one special character."
            )

        if not any(char.isupper() for char in password):
            raise serializers.ValidationError(
                "Password must contain at least one capital letter."
            )

        if sum(1 for char in password if char.isalpha()) < 4:
            raise serializers.ValidationError(
                "Password must contain at least 4 letters."
            )

        return data
