from django.shortcuts import render, redirect
from django.http import HttpResponse

from .models import Reviewlist


def review_list(request):
  reviews=Reviewlist.objects.all().order_by('-rating', '-year')
  context={
    'reviews': reviews
  }
  return render(request, 'review_list.html', context)

def review_create(request):
    if request.method=="POST":
        image = request.FILES.get('image')
        Reviewlist.objects.create(
            title=request.POST["title"],
            year=request.POST["year"],
            genre=request.POST["genre"],
            director=request.POST["director"],
            actor=request.POST["actor"],
            time=request.POST["time"],
            rating=request.POST["rating"],
            content=request.POST["content"],
            image=image
        )
        return redirect("/")
    return render(request, 'review_create.html')

def review_detail(request, pk):
   review=Reviewlist.objects.get(id=pk)
   context={
      "review":review
   }
   return render(request, 'review_detail.html', context)

def review_update(request, pk):
    review=Reviewlist.objects.get(id=pk)
    if request.method=="POST":
        title = request.POST.get("title")
        genre = request.POST.get("genre")
        director = request.POST.get("director")
        actor = request.POST.get("actor")
        time = request.POST.get("time")
        rating = request.POST.get("rating")
        content = request.POST.get("content")
        year = request.POST.get("year")
        imgfile = request.FILES.get("imgfile")
        
        # 가져온 데이터로 review 객체 업데이트
        review.title = title
        review.genre = genre
        review.director = director
        review.actor = actor
        review.time = time
        review.rating = rating
        review.content = content
        review.year = year      
        imgfile=imgfile 

        review.save()
        
        return redirect(f"/{pk}")
    context={
        "review":review
    }
    return render(request, 'review_update.html', context)

def review_delete(request, pk):
    if request.method=="POST":
        post=Reviewlist.objects.get(id=pk)
        post.delete()
    return redirect("/")