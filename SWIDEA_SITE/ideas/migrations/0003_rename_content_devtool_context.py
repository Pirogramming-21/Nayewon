# Generated by Django 5.0.7 on 2024-07-16 13:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ideas', '0002_devtool_alter_idea_content_alter_idea_image_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='devtool',
            old_name='content',
            new_name='context',
        ),
    ]
