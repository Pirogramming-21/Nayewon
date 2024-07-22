from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post, Comment, Like
from .forms import PostForm, CommentForm
import json

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('piro:index')
    else:
        form = UserCreationForm()
    return render(request, 'piro/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('piro:index')
        else:
            return render(request, 'piro/login.html', {'error': 'Invalid login details'})
    else:
        return render(request, 'piro/login.html')

@login_required
def logout_view(request):
    logout(request)
    return redirect('piro:login')

@login_required
def index_view(request):
    posts = Post.objects.all().order_by('-created_at')
    form = PostForm()
    return render(request, 'piro/index.html', {'posts': posts, 'form': form})

# @login_required
# def add_post(request):
#     if request.method == 'POST':
#         form = PostForm(request.POST, request.FILES)
#         if form.is_valid():
#             post = form.save(commit=False)
#             post.user = request.user
#             post.save()
#             return redirect('piro:index')
#     return redirect('piro:post_create')

@login_required
def add_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()
            return redirect('piro:index')
    else:
        form = PostForm()
    return render(request, 'piro/add_post.html', {'form': form})  # add_post.html 템플릿을 렌더링

@login_required
@csrf_exempt
def like_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        post_id = data.get('post_id')
        post = get_object_or_404(Post, id=post_id)
        Like_post = Like.objects.filter(user=request.user, post=post)
        if Like_post.exists():
            Like_post.delete()
            liked=False
        else:
            Like.objects.create(user=request.user, post=post)
            liked = True
        return JsonResponse({'liked': liked, 'likes_count': post.likes.count()})
    return JsonResponse({'error': 'Invalid request'}, status=400)



@login_required
@csrf_exempt
def add_comment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        post_id = data.get('post_id')
        content = data.get('content')
        post = get_object_or_404(Post, id=post_id)
        comment = Comment.objects.create(user=request.user, post=post, content=content)
        return JsonResponse({
            'comment_id': comment.id,
            'content': comment.content,
            'user': comment.user.username,
            'created_at': comment.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })
    return JsonResponse({'error': 'Invalid request'}, status=400)

@login_required
@csrf_exempt
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    if request.method == 'POST' and comment.user == request.user:
        comment.delete()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False})

@login_required
def post_detail(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    return render(request, 'piro/post_detail.html', {'post': post})
# @login_required
# def edit_post(request, post_id):
#     post = get_object_or_404(Post, id=post_id)
#     if request.user != post.user:
#         return HttpResponseForbidden("You are not allowed to edit this post.")
    
#     if request.method == 'POST':
#         form = PostForm(request.POST, request.FILES, instance=post)
#         if form.is_valid():
#             form.save()
#             return redirect('piro:index')
#     else:
#         form = PostForm(instance=post)
    
#     return render(request, 'piro/edit_post.html', {'form': form, 'post': post})

# @login_required
# def delete_post(request, post_id):
#     post = get_object_or_404(Post, id=post_id)
#     if request.user != post.user:
#         return HttpResponseForbidden("You are not allowed to delete this post.")
    
#     if request.method == 'POST':
#         post.delete()
#         return redirect('piro:index')
    
#     return render(request, 'piro/delete_post.html', {'post': post})
