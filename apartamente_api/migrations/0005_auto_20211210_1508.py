# Generated by Django 2.1.15 on 2021-12-10 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartamente_api', '0004_auto_20211210_1506'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tipapartament',
            name='apartamente',
            field=models.ManyToManyField(default=None, null=True, related_name='apartamente', to='apartamente_api.Apartament'),
        ),
    ]
