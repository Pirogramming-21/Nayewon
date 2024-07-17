from django.contrib import admin

# Register your models here.

from .models import Idea, DevTool

admin.site.register(Idea)
admin.site.register(DevTool)


