# Generated by Django 3.2.5 on 2021-08-09 17:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210724_1223'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Room',
        ),
        migrations.RemoveField(
            model_name='hops',
            name='name',
        ),
    ]
