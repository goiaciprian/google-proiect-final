from django.db import models

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
    Denumire = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Apartament(ModelBase):
    """
    Model for apartament
    """
    denumire = models.CharField(max_length=50)
    adresa = models.CharField(max_length=50)
    tip = models.ForeignKey(TipApartament, on_delete=models.CASCADE)
    chirie = models.DecimalField(max_digits=10, decimal_places=2)
    descriere = models.TextField()

    def __str__(self):
        return self.nume
