from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('appointments', AppointmentViewset, basename='appointments')

urlpatterns = router.urls

# Add token endpoints for login
urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login to get the token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh the token
]