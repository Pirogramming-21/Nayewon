# Generated by Django 5.0.7 on 2024-07-16 11:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ideas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DevTool',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=255)),
                ('kind', models.CharField(default='', max_length=255)),
                ('content', models.TextField(default='')),
            ],
        ),
        migrations.AlterField(
            model_name='idea',
            name='content',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='idea',
            name='image',
            field=models.ImageField(default='', upload_to='ideas/'),
        ),
        migrations.AlterField(
            model_name='idea',
            name='title',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='idea',
            name='devtool',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ideas.devtool'),
        ),
    ]