from django.urls import path
from .views import *
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

urlpatterns = [
    path('', api_overview, name='api-overview'),
    path('login/', obtain_jwt_token, name='login'),
    path('refresh-token/', refresh_jwt_token, name='refresh-token'),
    path('verify-token/', verify_jwt_token, name='verify-token'),
    path('TipApartamenteList/', get_tip_apartament_list,
         name='get-tip-apartament-list'),
    path('TipApartamentById/<int:id>/', get_tip_apartament_by_id,
         name='get-tip-apartament-by-id'),
    path('TipApartamentMerge', merge_tip_apartament, name='merge-tip-apartament'),
    path('TipApartamentDelete/<int:id>/',
         delete_tip_apartament, name='delete-tip-apartament'),
    path('ApartamenteList/', get_apartamente_list, name='get-apartament-list'),
]
