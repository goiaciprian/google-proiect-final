
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import Http404
from django.contrib.auth.models import User
from json import loads

from apartamente_api.utils import create_token

from .models import LocuitoriApartament, TipApartament, Apartament, AplicantiApartament
from .serializers import AplicantiApartamentSerializer, TipApartamentSerializer, ApartamentSerializer, UserSerializer, LocuitoriApartamentSerializer

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_tip_apartament(request, id):
    try:
        tip_apartament = TipApartament.objects.get(id=id)
        tip_apartament.deleted = True
        tip_apartament.save()

        return Response(TipApartamentSerializer(tip_apartament, many=False).data, status=status.HTTP_200_OK)
    except TipApartament.DoesNotExist:
        raise Http404


@api_view(['GET'])
@permission_classes([AllowAny])
def get_apartamente_list(request):
    elementePePagina = request.GET.get('elemente', 10)
    pagina = request.GET.get('pagina', 1)

    print(elementePePagina)
    print(pagina)

    indexFinal = int(elementePePagina) * int(pagina)
    indexStart = indexFinal - int(elementePePagina)

    apartamente = list(Apartament.objects.filter(deleted=False))[
        indexStart:indexFinal]
    return Response(ApartamentSerializer(apartamente, many=True).data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_apartament_by_id(request, id):
    try:
        return Response(ApartamentSerializer(Apartament.objects.filter(deleted=False).get(id=id), many=False).data)
    except Apartament.DoesNotExist:
        raise Http404


@api_view(['GET'])
@permission_classes([AllowAny])
def get_apartamente_by_owner_id(request, id):
    try:
        return Response(ApartamentSerializer(Apartament.objects.filter(deleted=False).filter(owner=id), many=True).data)
    except Apartament.DoesNotExist:
        raise Http404


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def merge_apartament(request):
    created = False
    nameExists = False
    body = loads(request.body.decode('utf-8'))
    try:
        apartament = Apartament.objects.get(id=int(body['id']))

    except Exception:
        apartament = Apartament()
        created = True
    finally:
        apartamente = Apartament.objects.filter(denumire=body['denumire'])
        if(apartamente.exists()):
            nameExists = True
            apartament = apartamente.first()

    if(apartament.deleted):
        apartament.deleted = False

    if(nameExists):
        return Response(ApartamentSerializer(apartament, many=False).data, status=status.HTTP_302_FOUND)

    apartament.denumire = body['denumire']
    apartament.adresa = body['adresa']
    apartament.chirie = int(body['chirie'])
    apartament.metri_patrati = int(body['metri_patrati'])
    apartament.tip = TipApartament.objects.get(id=int(body['tip_apartament']))
    apartament.owner = User.objects.get(id=int(body['owner']))

    apartament.save()

    return Response(ApartamentSerializer(apartament, many=False).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_apartament(request, id):
    try:
        apartament = Apartament.objects.get(id=id)
        apartament.deleted = True
        apartament.save()

        return Response(ApartamentSerializer(apartament, many=False).data, status=status.HTTP_200_OK)
    except Apartament.DoesNotExist:
        raise Http404


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_apartament_aplicari(request, apartament_id):
    try:
        aplicatie = AplicantiApartament.objects.filter(
            deleted=False).filter(apartament_id=apartament_id)
        return Response(AplicantiApartamentSerializer(aplicatie, many=True).data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def adauga_aplicare_apartament(request):
    try:

        body = loads(request.body.decode('utf-8'))

        apartament = Apartament.objects.get(id=int(body['apartament']))
        user = User.objects.get(id=int(body['user']))

        if(AplicantiApartament.objects.filter(apartament=apartament, aplicant=user).exists()):
            return Response(status=status.HTTP_302_FOUND)

        aplicatie = AplicantiApartament()
        aplicatie.apartament = apartament
        aplicatie.aplicant = user
        aplicatie.save()

        return Response(AplicantiApartamentSerializer(apartament, many=False).data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def accept_deny_aplicatie(request, id, sts):
    try:
        aplicatie = AplicantiApartament.objects.filter(
            deleted=False).get(id=id)
        if(sts):
            aplicatie.status = True if sts == 1 else False
            locuitor = LocuitoriApartament()
            locuitor.apartament = aplicatie.apartament
            locuitor.locuitor = aplicatie.aplicant
            locuitor.save()

        aplicatie.save()

        return Response(AplicantiApartamentSerializer(aplicatie, many=False).data, status=status.HTTP_200_OK)
    except AplicantiApartament.DoesNotExist:
        raise Http404


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_locuitori_apartament(request, apartament_id):
    try:
        locuitori = LocuitoriApartament.objects.filter(
            deleted=False).filter(apartament_id=apartament_id)
        return Response(LocuitoriApartamentSerializer(locuitori, many=True).data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@ api_view(['POST'])
@ permission_classes([AllowAny])
def register_user(request):
    try:
        body = loads(request.body.decode('utf-8'))
        if(User.objects.filter(username=body['email']).exists()):
            return Response(status=status.HTTP_302_FOUND)

        user = User()
        user.first_name = body['first_name']
        user.last_name = body['last_name']
        user.username = body['email']
        user.email = body['email']
        user.set_password(body['password'])

        user.save()
        token = create_token(user)

        return Response({'token': token, 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
