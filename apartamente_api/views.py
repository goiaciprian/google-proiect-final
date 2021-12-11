
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import Http404
from django.contrib.auth.models import User
from json import loads

from .models import TipApartament, Apartament
from .serializers import TipApartamentSerializer, ApartamentSerializer, UserSerializer

# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def api_overview(request):

    api_urls = {
        'Get Apartamente GET': '/apartamente/',
        'Create / Update Apartamente POST': '/apartamente/',
        'Delete Apartamente DELETE': '/apartamente/<int:id>/',
    }

    return Response(api_urls)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_tip_apartament_list(request):
    tip_apartamente = TipApartament.objects.filter(deleted=False)
    return Response(TipApartamentSerializer(tip_apartamente, many=True).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_tip_apartament_by_id(request, id):
    try:
        tip_apartament = TipApartament.objects.filter(deleted=False).get(id=id)
        return Response(TipApartamentSerializer(tip_apartament, many=False).data)
    except TipApartament.DoesNotExist:
        raise Http404


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def merge_tip_apartament(request):
    created = False
    nameExists = False
    body = loads(request.body.decode('utf-8'))
    try:
        tip_apartament = TipApartament.objects.get(id=int(body['id']))

    except Exception:
        tip_apartament = TipApartament()
        created = True
    finally:
        apartamente = TipApartament.objects.filter(denumire=body['denumire'])
        if(apartamente.exists()):
            nameExists = True
            tip_apartament = apartamente.first()

    if(tip_apartament.deleted):
        tip_apartament.deleted = False

    if(nameExists):
        return Response(TipApartamentSerializer(tip_apartament, many=False).data, status=status.HTTP_302_FOUND)

    tip_apartament.denumire = body['denumire']
    tip_apartament.save()

    return Response(TipApartamentSerializer(tip_apartament, many=False).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_tip_apartament(request, id):
    print(request.user)
    try:
        tip_apartament = TipApartament.objects.get(id=id)
        tip_apartament.deleted = True
        tip_apartament.save()

        return Response(TipApartamentSerializer(tip_apartament, many=False).data, status=status.HTTP_200_OK)
    except TipApartament.DoesNotExist:
        raise Http404


@permission_classes([AllowAny])
@api_view(['GET'])
def get_apartamente_list(request):
    apartamente = Apartament.objects.filter(deleted=False)
    return Response(ApartamentSerializer(apartamente, many=True).data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    body = loads(request.body.decode('utf-8'))
    if(User.objects.filter(username=body['username']).exists()):
        return Response(status=status.HTTP_302_FOUND)

    user = User()
    user.first_name = body['first_name']
    user.last_name = body['last_name']
    user.username = body['email']
    user.email = body['email']
    user.set_password(body['password'])

    user.save()

    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
