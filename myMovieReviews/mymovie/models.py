from django.db import models

# Create your models here.

class Reviewlist(models.Model):

    GENRE_CHOICES = [
        ('action', 'Action'),
        ('comedy', 'Comedy'),
        ('drama', 'Drama'),
        ('horror', 'Horror'),
        ('romance', 'Romance'),
        ('documentary', 'Documentary'),
        ('sci-fi', 'Sci-Fi'),
        ('animation', 'Animation'),
        ('disaster', 'Disaster'),
        ('art', 'Art'),
    ]


    title=models.CharField(max_length=32)
    year=models.CharField(max_length=20)
    genre=models.CharField(max_length=40, choices=GENRE_CHOICES)
    rating=models.CharField(max_length=20)
    director=models.CharField(max_length=20, default='')
    actor=models.CharField(max_length=40, default='')
    time=models.CharField(max_length=20,default='')
    image = models.ImageField(upload_to='images/', blank=True)
    content=models.TextField()