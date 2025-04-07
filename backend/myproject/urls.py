from django.contrib import admin
from django.urls import path, include
from myapi.views import google_oauth2_callback, get_csrf_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapi.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/google/', google_oauth2_callback, name='google_login'),
    path('api/auth/csrf/', get_csrf_token, name='csrf_token'),
    path('accounts/', include('allauth.urls')),
]