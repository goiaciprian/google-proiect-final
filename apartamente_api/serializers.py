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

    class Meta:
        model = Apartament
        fields = ['id', 'denumire', 'adresa', 'tip', 'chirie', 'metri_patrati']


class AplicantiApartamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AplicantiApartament
        fields = ['id', 'apartament', 'aplicant', 'status']


class LocuitoriApartamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocuitoriApartament
        fields = '__all__'
