# Generated by Django 2.1.15 on 2021-12-11 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartamente_api', '0007_apartament_metri_patrati'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apartament',
            name='metri_patrati',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
