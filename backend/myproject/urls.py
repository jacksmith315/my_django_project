from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.contrib.auth import get_user_model, login
from allauth.socialaccount.models import SocialAccount, SocialToken, SocialApp
from django.conf import settings
import requests
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from allauth.account.models import EmailAddress
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
import json

User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173"
    client_class = OAuth2Client
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        try:
            access_token = request.data.get('access_token')
            if not access_token:
                return Response({'error': 'No access token provided'}, status=400)

            # Get user info from token
            user_data = request.data.get('user_data', {})
            email = user_data.get('email')
            
            if not email:
                return Response({'error': 'Could not get user email'}, status=400)

            # Try to get existing user
            user = User.objects.filter(email=email).first()
            
            if user:
                # User exists, ensure email is verified
                EmailAddress.objects.update_or_create(
                    user=user,
                    email=email,
                    defaults={'verified': True, 'primary': True}
                )

                # Get or create social account
                try:
                    social_app = SocialApp.objects.get(provider='google')
                except SocialApp.DoesNotExist:
                    return Response({'error': 'Google social app not configured'}, status=400)

                social_account, _ = SocialAccount.objects.get_or_create(
                    user=user,
                    provider='google'
                )

                # Create social token
                SocialToken.objects.update_or_create(
                    account=social_account,
                    app=social_app,
                    defaults={'token': access_token}
                )

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                
                # Trigger the login signal
                user_logged_in.send(sender=user.__class__, request=request, user=user)

                return Response({
                    'user': {
                        'email': user.email,
                        'username': user.username,
                    },
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh)
                })
            else:
                # Create new user via dj-rest-auth
                return super().post(request, *args, **kwargs)

        except Exception as e:
            print(f"Google login error: {str(e)}")
            return Response({'error': str(e)}, status=400)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapi.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/google/', csrf_exempt(GoogleLogin.as_view()), name='google_login'),
    path('accounts/', include('allauth.urls')),
]