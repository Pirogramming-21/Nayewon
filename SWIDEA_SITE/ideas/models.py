from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class DevTool(models.Model):
    name = models.CharField(max_length=255, default='')
    kind = models.CharField(max_length=255, default='')
    context = models.TextField(default='')

    def __str__(self):
        return self.name

class Idea(models.Model):
    title = models.CharField(max_length=255, default='')
    image=models.ImageField(upload_to='images/', default='')
    content = models.TextField(default='')
    interest = models.IntegerField(default=0)
    devtool = models.ForeignKey(DevTool, on_delete=models.CASCADE, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class IdeaImage(models.Model):
    idea = models.ForeignKey(Idea, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return f"Image for {self.idea.title}"
    

class IdeaStar(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return f"{self.user.username} likes {self.idea.title}"
    

