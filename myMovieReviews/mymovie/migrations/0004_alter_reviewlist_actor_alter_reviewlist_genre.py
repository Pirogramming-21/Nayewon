# Generated by Django 5.0.7 on 2024-07-11 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mymovie', '0003_reviewlist_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewlist',
            name='actor',
            field=models.CharField(default='', max_length=40),
        ),
        migrations.AlterField(
            model_name='reviewlist',
            name='genre',
            field=models.CharField(max_length=40),
        ),
    ]
