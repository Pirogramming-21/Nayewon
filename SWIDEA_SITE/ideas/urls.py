from django.urls import path
from .views import *

app_name = 'ideas'

urlpatterns = [
    path('', idea_list, name='idea_list'),
    path('create', idea_create, name='idea_create'),   
    path('<int:pk>', idea_detail, name='idea_detail'),
    path('<int:pk>/update', idea_update, name='idea_update'),
    path('<int:pk>/delete', idea_delete, name='idea_delete'),
    path('devtools/', tool_list, name='tool_list'),
    path('devtools/create', tool_create, name='tool_create'),
    path('devtools/<int:pk>', tool_detail, name='tool_detail'),
    path('devtools/<int:pk>/update', tool_update, name='tool_update'),
    path('devtools/<int:pk>/delete', tool_delete, name='tool_delete'),
    path('<int:pk>/toggle_star', toggle_star, name='toggle_star'),
   
]