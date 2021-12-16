from django import db
from django.db import models
from apartamente_app.settings import AUTH_USER_MODEL
# Create your models here.


class ModelBase(models.Model):
    """
    Base class for all  models
    """
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted = models.BooleanField(default=False)


class TipApartament(ModelBase):
    """
    Model for tip apartament
    """
    class Meta:
        db_table = 'tip_apartament'

    denumire = models.CharField(max_length=50)

    def __str__(self):
        return self.denumire


class Apartament(ModelBase):
    """
    Model for apartament
    """
    class Meta:
        db_table = 'apartament'

    denumire = models.CharField(max_length=50, null=False)
    adresa = models.CharField(max_length=50, null=False)
    tip = models.ForeignKey(
        TipApartament, on_delete=models.CASCADE, null=False)
    chirie = models.DecimalField(max_digits=10, decimal_places=2, )

    owner = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)

    metri_patrati = models.DecimalField(
        max_digits=10, decimal_places=2)

    aplicanti = models.ManyToManyField(
        AUTH_USER_MODEL, through="AplicantiApartament", related_name='aplicanti')

    locuitori = models.ManyToManyField(
        AUTH_USER_MODEL, through="LocuitoriApartament", related_name='locuitori')

    def __str__(self):
        return self.denumire

    def get_metri_patrati(self):
        return self.metri_patrati
    get_metri_patrati.short_description = 'Metri patrati'

    def get_tip(self):
        return self.tip.denumire
    get_tip.short_description = 'Tip'

    def get_locuitori_number(self):
        return self.locuitori.count()
    get_locuitori_number.short_description = 'Locuitori No'

    def get_aplicanti_number(self):
        return self.aplicanti.count()
    get_aplicanti_number.short_description = 'Aplicanti No'

    def get_chirie(self):
        return self.chirie
    get_chirie.short_description = 'Chirie'


class AplicantiApartament(ModelBase):
    """
    Model for AplicantiApartament
    """
    class Meta:
        db_table = 'aplicanti_apartament'

    apartament = models.ForeignKey(
        Apartament, on_delete=models.CASCADE, null=False)
    aplicant = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)

    status = models.BooleanField(null=True)

    def nume_aplicant(self):
        return self.aplicant.first_name + ' ' + self.aplicant.last_name
    nume_aplicant.short_description = 'Nume Aplicant'

    def denumire_apartament(self):
        return self.apartament.denumire
    denumire_apartament.short_description = 'Apartament'

    def data_aplicare(self):
        return self.created_at
    data_aplicare.short_description = 'Data Aplicare'

    def __str__(self):
        return f'{self.apartament.denumire} - {self.aplicant.first_name} {self.aplicant.last_name}'


class LocuitoriApartament(ModelBase):
    """
    Model for LocuitoriApartament
    """

    class Meta:
        db_table = 'locuitori_apartament'

    apartament = models.ForeignKey(
        Apartament, on_delete=models.CASCADE, null=False)
    locuitor = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, )

    locuieste_in_prezent = models.BooleanField(default=True)

    def nume_locuitor(self):
        return self.locuitor.first_name + ' ' + self.locuitor.last_name
    nume_locuitor.short_description = 'Nume Locuitor'

    def denumire_apartament(self):
        return self.apartament.denumire
    denumire_apartament.short_description = 'Apartament'

    def data_inceput(self):
        return self.created_at
    data_inceput.short_description = 'Data Inceput'

    def __str__(self):
        return f'{self.apartament.denumire} - {self.locuitor.first_name} {self.locuitor.last_name}'
