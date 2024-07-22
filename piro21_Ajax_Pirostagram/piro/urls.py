from django.urls import path
from . import views

app_name = 'piro'

urlpatterns = [
    path('', views.index_view, name='index'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('like_post/', views.like_post, name='like_post'),
    path('add_comment/', views.add_comment, name='add_comment'),
    path('delete_comment/<int:comment_id>/', views.delete_comment, name='delete_comment'),
    path('add_post/', views.add_post, name='add_post'),
    # path('edit_post/<int:post_id>/', views.edit_post, name='edit_post'),  
    # path('delete_post/<int:post_id>/', views.delete_post, name='delete_post'), 
]