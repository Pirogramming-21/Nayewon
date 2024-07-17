from django import forms
from .models import Idea, DevTool, IdeaImage


class IdeaForm(forms.ModelForm):
    class Meta:
        model = Idea
        fields = ['title', 'content', 'interest', 'devtool']

class ImageForm(forms.ModelForm):
    image = forms.ImageField(widget=forms.ClearableFileInput(attrs={'allow_multiple_selected': True}), required=False)

    class Meta:
        model = IdeaImage
        fields = ['image']
  


class DevToolForm(forms.ModelForm):
  class Meta():
    model = DevTool
    fields = ['name', 'kind', 'context']

  