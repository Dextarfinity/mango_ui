from django import forms
from .models import FoodItem

class FoodItemForm(forms.ModelForm):
    class Meta:
        model = FoodItem
        fields = ['name', 'quantity', 'quantity_unit', 'is_surplus', 'category']
        widgets = {
            'quantity_unit': forms.Select(attrs={'class': 'form-select'}),
            'category': forms.Select(attrs={'class': 'form-select'}),
            'is_surplus': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'quantity': forms.NumberInput(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
        }

class DonationCenterSearchForm(forms.Form):
    query = forms.CharField(label='Search', required=False)
