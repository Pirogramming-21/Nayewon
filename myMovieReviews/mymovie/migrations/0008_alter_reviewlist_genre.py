# Generated by Django 5.0.7 on 2024-07-12 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mymovie', '0007_remove_reviewlist_imgfile_reviewlist_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewlist',
            name='genre',
            field=models.CharField(choices=[('action', 'Action'), ('comedy', 'Comedy'), ('drama', 'Drama'), ('horror', 'Horror'), ('romance', 'Romance'), ('documentary', 'Documentary'), ('sci-fi', 'Sci-Fi'), ('animation', 'Animation'), ('disaster', 'Disaster'), ('art', 'Art')], max_length=40),
        ),
    ]
