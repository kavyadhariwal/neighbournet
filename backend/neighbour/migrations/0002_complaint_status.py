# Generated by Django 5.1.5 on 2025-04-18 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('neighbour', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaint',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Solved', 'Solved')], default='Pending', max_length=20),
        ),
    ]
