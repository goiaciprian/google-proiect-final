from rest_framework import serializers
from .models import TipApartament, Apartament, AplicantiApartament, LocuitoriApartament
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "first_name", "last_name"]


class TipApartamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipApartament
        fields = ['id', 'denumire']


class ApartamentSerializer(serializers.ModelSerializer):

    chirie = serializers.DecimalField(max_digits=10, decimal_places=2)
    metri_patrati = serializers.DecimalField(max_digits=10, decimal_places=2)
    tip = TipApartamentSerializer(read_only=True)

    class Meta:
        model = Apartament
        fields = ['id', 'denumire', 'adresa', 'tip',
                  'chirie', 'metri_patrati', 'owner']


class AplicantiApartamentSerializer(serializers.ModelSerializer):

    apartament = ApartamentSerializer(read_only=True)
    aplicant = UserSerializer(read_only=True)

    class Meta:
        model = AplicantiApartament
        fields = ['id', 'apartament', 'aplicant', 'status', 'created_at']


class LocuitoriApartamentSerializer(serializers.ModelSerializer):
    apartament = ApartamentSerializer(read_only=True)
    locuitor = UserSerializer(read_only=True)
    class Meta:
        model = LocuitoriApartament
        fields = ['id', 'locuieste_in_prezent', 'apartament', 'locuitor', 'created_at']
