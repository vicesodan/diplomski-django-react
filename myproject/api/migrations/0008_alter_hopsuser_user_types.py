# Generated by Django 3.2.5 on 2021-08-15 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210815_1524'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hopsuser',
            name='user_types',
            field=models.IntegerField(choices=[('1', 'Admin'), ('2', 'Director'), ('3', 'Engineer')]),
        ),
    ]