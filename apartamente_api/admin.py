from django.contrib import admin
from django.db import models
from .models import Apartament, LocuitoriApartament, AplicantiApartament, TipApartament

# Register your models here.


@admin.register(TipApartament)
class TipApartamentAdmin(admin.ModelAdmin):
    list_display = ['denumire']

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        user = request.user

        if(user.is_superuser):
            return queryset

        return queryset.filter(user=user)


@admin.register(Apartament)
class ApartamentAdmin(admin.ModelAdmin):
    list_display = ('denumire', 'get_tip', 'get_locuitori_number',
                    'get_aplicanti_number', 'get_chirie')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        user = request.user

        if(user.is_superuser):
            return queryset

        return queryset.filter(user=user)


@admin.register(AplicantiApartament)
class AplicantiApartament(admin.ModelAdmin):
    list_display = ('nume_aplicant', 'denumire_apartament',
                    'status', 'data_aplicare')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        user = request.user

        if(user.is_superuser):
            return queryset

        return queryset.filter(user=user)


@admin.register(LocuitoriApartament)
class LocuitoriApartamentAdmin(admin.ModelAdmin):
    list_display = ('nume_locuitor', 'denumire_apartament',
                    'locuieste_in_prezent', 'data_inceput')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        user = request.user

        if(user.is_superuser):
            return queryset

        return queryset.filter(user=user)
