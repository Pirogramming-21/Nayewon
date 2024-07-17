from django import forms
from .models import Idea, DevTool


class IdeaForm(forms.ModelForm):
    class Meta:
        model = Idea
        fields = ['title', 'content', 'interest', 'devtool']



class DevToolForm(forms.ModelForm):
  class Meta():
    model = DevTool
    fields = ['name', 'kind', 'context']

  