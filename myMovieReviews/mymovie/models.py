from django.db import models

# Create your models here.

class Reviewlist(models.Model):
    title=models.CharField(max_length=32)
    year=models.CharField(max_length=20)
    genre=models.CharField(max_length=40)
    rating=models.CharField(max_length=20)
    director=models.CharField(max_length=20, default='')
    actor=models.CharField(max_length=40, default='')
    time=models.CharField(max_length=20,default='')
    image=models.ImageField(upload_to='images/', blank=True)
    content=models.TextField()