from django.shortcuts import render, redirect
from .models import Idea, DevTool, IdeaStar, IdeaImage
from .forms import IdeaForm, DevToolForm
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.db.models import Count


def idea_list(request):
    sort = request.GET.get('sort', '')
    ideas = Idea.objects.all()

    if sort == 'starred':
        ideas = ideas.annotate(num_stars=Count('ideastar')).order_by('-num_stars')
    if sort == 'name':
        ideas = ideas.order_by('title')
    elif sort == 'created':
        ideas = ideas.order_by('created_at')
    elif sort == 'latest':
        ideas = ideas.order_by('-updated_at')

    starred_ideas = []
    # if request.user.is_authenticated:
    #     starred_ideas = IdeaStar.objects.filter(user=request.user).values_list('idea_id', flat=True)

    ctx = {
        'ideas': ideas,
        'starred_ideas': starred_ideas
    }
    return render(request, 'idea_list.html', ctx)


def idea_create(request):
    if request.method == "POST":
        form = IdeaForm(request.POST)
        
        if form.is_valid():
            # Create Idea object
            idea = form.save(commit=False)  # Commit=False to prevent saving to DB yet
            image = request.FILES.get('image')
            if image:
                idea.image = image 
            idea.save()      
            
            return redirect("ideas:idea_detail", pk=idea.pk)
    else:
        form = IdeaForm()
       

    context = {
        'form': form,
       
    }
    return render(request, 'idea_create.html', context)


def idea_detail(request, pk):
   idea=Idea.objects.get(id=pk)
   
   ctx = {'idea':idea}
   return render(request, 'idea_detail.html', ctx)

def idea_delete(req,pk):
  Idea.objects.get(id=pk).delete()
  return redirect('ideas:idea_list')


def idea_update(request, pk):
    idea = Idea.objects.get(pk=pk)

    if request.method == "POST":
        form = IdeaForm(request.POST, instance=idea)
       
        if form.is_valid():
            form.save()
           
            return redirect("ideas:idea_detail", pk=pk)
    else:
        form = IdeaForm(instance=idea)
       
    ctx = {
        'form': form,
 
        'idea': idea,
    }
    return render(request, 'idea_update.html', ctx)
#devtools----------------------------------------------

def tool_list(req):
    tools=DevTool.objects.all()
    ctx={
        'tools':tools
    }
    return render(req, 'tool_list.html', ctx)

def tool_create(req):
  if req.method == "GET":
    form = DevToolForm()
    ctx = {'form':form}
    return render(req, 'tool_create.html',ctx)
  form = DevToolForm(req.POST, req.FILES)
  if form.is_valid():
    tool=form.save()
  return redirect("ideas:tool_detail", pk=tool.pk)

def tool_detail(request, pk):
   tool=DevTool.objects.get(id=pk)
   ideas = Idea.objects.filter(devtool=tool)
   context={
      "tool":tool,
      "ideas": ideas
   }
   return render(request, 'tool_detail.html', context)

def tool_delete(req,pk):
  DevTool.objects.get(id=pk).delete()
  return redirect('ideas:tool_list')

def tool_update(req,pk):
  tool = DevTool.objects.get(id=pk)
  if req.method == "GET":
    form = DevToolForm(instance=tool)
    ctx = {'form' : form, 'pk':pk}
    return render(req,'tool_update.html',ctx)
  
  form = DevToolForm(req.POST, req.FILES, instance=tool)
  if form.is_valid():
    form.save()
  return redirect("ideas:tool_detail", pk)


from django.http import JsonResponse

@require_POST

def toggle_star(request, pk):
    idea = Idea.objects.get(id=pk)
    star, created = IdeaStar.objects.get_or_create(idea=idea)
    if not created:
        star.delete()
        starred = False
    else:
        starred = True
    return JsonResponse({'starred': starred})

@require_POST
def change_interest(request, pk):
    idea = Idea.objects.get(id=pk)
    action = request.POST.get('action')
    if action == 'increase':
        idea.interest += 1
    elif action == 'decrease':
        idea.interest -= 1
        if idea.interest < 0:
            idea.interest = 0
    idea.save()
    return JsonResponse({'interest': idea.interest})


