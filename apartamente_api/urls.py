from django.urls import path
from .views import *
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

urlpatterns = [
    path('', api_overview, name='api-overview'),
    path('login/', obtain_jwt_token, name='login'),
    path('refresh-token/', refresh_jwt_token, name='refresh-token'),
    path('verify-token/', verify_jwt_token, name='verify-token'),
    path('register/', register_user, name='register'),
    path('TipApartamenteList/', get_tip_apartament_list,
         name='get-tip-apartament-list'),
    path('TipApartamentById/<int:id>/', get_tip_apartament_by_id,
         name='get-tip-apartament-by-id'),
    path('TipApartamentMerge', merge_tip_apartament, name='merge-tip-apartament'),
    path('TipApartamentDelete/<int:id>/',
         delete_tip_apartament, name='delete-tip-apartament'),
    path('ApartamenteList/', get_apartamente_list, name='get-apartament-list'),
    path('ApartamentById/<int:id>/', get_apartament_by_id,
         name='get-apartament-by-id'),
    path('ApartamenteByOwnerId/<int:id>/', get_apartamente_by_owner_id,
         name='get-apartamente-by-owner-id'),
    path('ApartamentMerge', merge_apartament, name='merge-apartament'),
    path('ApartamentDelete/<int:id>/',
         delete_apartament, name='delete-apartament'),
    path('ApartamentAplicariListByApartament/<int:apartament_id>/',
         get_apartament_aplicari, name='get-apartament-aplicari'),
    path("ApartamentAplica", adauga_aplicare_apartament,
         name="adauga-aplicare-apartament"),
    path("ApartamentUpdateAplicare/<int:id>/<int:sts>/",
         accept_deny_aplicatie, name="accept-deny-aplicatie"),
    path("ApartamentLocuitoriListByApartament/<int:apartament_id>/",
         get_locuitori_apartament, name="get-locuitori-apartament"),
]
