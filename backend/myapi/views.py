from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import requests
from django.contrib.auth import get_user_model
from allauth.socialaccount.models import SocialAccount
from allauth.account.models import EmailAddress
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware.csrf import get_token
from django.http import JsonResponse

User = get_user_model()

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]

@ensure_csrf_cookie
@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def google_oauth2_callback(request):
    try:
        access_token = request.data.get('access_token')
        if not access_token:
            return Response({'error': 'No access token provided'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        # Verify token with Google
        google_response = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {access_token}'}
        )
        
        if not google_response.ok:
            return Response({
                'error': 'Failed to verify token with Google',
                'details': google_response.text
            }, status=status.HTTP_400_BAD_REQUEST)

        google_data = google_response.json()
        email = google_data.get('email')
        
        if not email:
            return Response({'error': 'Email not provided by Google'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        # Get or create user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create_user(
                email=email,
                username=email.split('@')[0]
            )
            
            # Mark email as verified
            EmailAddress.objects.create(
                user=user,
                email=email,
                verified=True,
                primary=True
            )

        # Update or create social account
        social_account, _ = SocialAccount.objects.get_or_create(
            user=user,
            provider='google',
            defaults={'uid': google_data.get('sub')}
        )
        social_account.extra_data = google_data
        social_account.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': {
                'email': user.email,
                'username': user.username,
            },
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Google OAuth error: {str(e)}")
        return Response({
            'error': 'Authentication failed',
            'details': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)