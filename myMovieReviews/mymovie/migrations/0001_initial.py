# Generated by Django 5.0.7 on 2024-07-11 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reviewlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32)),
                ('year', models.CharField(max_length=20)),
                ('genre', models.CharField(max_length=20)),
                ('rating', models.CharField(max_length=20)),
                ('content', models.TextField()),
            ],
        ),
    ]
