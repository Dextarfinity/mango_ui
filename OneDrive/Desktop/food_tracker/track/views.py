from django.shortcuts import render, redirect
from .models import FoodItem
from .forms import FoodItemForm
from django.db.models import Count, Sum
import django.db.models as models
from django.shortcuts import render
from .models import FoodItem, DonationCenter
from .forms import FoodItemForm, DonationCenterSearchForm
import math

def home(request):
    items = FoodItem.objects.all().order_by('-created_at')
    return render(request, 'track/home.html', {'items': items})

def add_food(request):
    if request.method == 'POST':
        form = FoodItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = FoodItemForm()
    return render(request, 'track/add_food.html', {'form': form})

def report(request):
    total_items = FoodItem.objects.count()
    total_quantity = FoodItem.objects.aggregate(Sum('quantity'))['quantity__sum']
    category_count = FoodItem.objects.values('category').annotate(count=Count('id'))

    surplus_quantity = FoodItem.objects.filter(is_surplus=True).aggregate(Sum('quantity'))['quantity__sum'] or 0
    non_surplus_quantity = FoodItem.objects.filter(is_surplus=False).aggregate(Sum('quantity'))['quantity__sum'] or 0
    surplus_percentage = (surplus_quantity / total_quantity * 100) if total_quantity else 0

    return render(request, 'track/report.html', {
        'total_items': total_items,
        'total_quantity': total_quantity,
        'category_count': category_count,
        'surplus_quantity': surplus_quantity,
        'non_surplus_quantity': non_surplus_quantity,
        'surplus_percentage': surplus_percentage,
    })

def haversine(lat1, lon1, lat2, lon2):
    # Calculate the great circle distance between two points on the earth (specified in decimal degrees)
    R = 6371  # Radius of earth in kilometers
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(delta_lambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def search_donation_centers(request):
    results = None
    if request.method == 'POST':
        form = DonationCenterSearchForm(request.POST)
        if form.is_valid():
            query = form.cleaned_data.get('query', '').strip()
            if query:
                results = DonationCenter.objects.filter(
                    models.Q(name__icontains=query) | models.Q(location__icontains=query)
                )
            else:
                results = []
    else:
        form = DonationCenterSearchForm()
    return render(request, 'track/search_donation_centers.html', {'form': form, 'results': results})
