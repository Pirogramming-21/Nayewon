from django.shortcuts import render, redirect
from django.http import HttpResponse

from .models import Reviewlist


def review_list(request):
  reviews=Reviewlist.objects.all()
  context={
    'reviews': reviews
  }
  return render(request, 'review_list.html', context)

def review_create(request):
    if request.method=="POST":
        Reviewlist.objects.create(
            title=request.POST["title"],
            genre=request.POST["genre"],
            director=request.POST["director"],
            actor=request.POST["actor"],
            time=request.POST["time"],
            rating=request.POST["rating"],
            content=request.POST["content"]
        )
        return redirect("/")
    return render(request, 'review_create.html')

def review_detail(request, pk):
   review=Reviewlist.objects.filter(post=pk)
   context={
      "review":review
   }
   return render(request, 'review_detail.html', context)