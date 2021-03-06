# Generated by Django 2.1.15 on 2021-12-10 14:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Apartament',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('denumire', models.CharField(max_length=50)),
                ('adresa', models.CharField(max_length=50)),
                ('chirie', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'db_table': 'apartament',
            },
        ),
        migrations.CreateModel(
            name='AplicantiApartament',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('apartament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apartamente_api.Apartament')),
                ('aplicant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'aplicanti_apartament',
            },
        ),
        migrations.CreateModel(
            name='LocuitoriApartament',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('apartament', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apartamente_api.Apartament')),
                ('locuitor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'locuitori_apartament',
            },
        ),
        migrations.CreateModel(
            name='TipApartament',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('Denumire', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'tip_apartament',
            },
        ),
        migrations.AddField(
            model_name='apartament',
            name='aplicanti',
            field=models.ManyToManyField(related_name='aplicanti', through='apartamente_api.AplicantiApartament', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='apartament',
            name='locuitori',
            field=models.ManyToManyField(related_name='locuitori', through='apartamente_api.LocuitoriApartament', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='apartament',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='apartament',
            name='tip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apartamente_api.TipApartament'),
        ),
    ]
