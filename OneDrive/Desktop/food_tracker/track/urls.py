from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('add/', views.add_food, name='add_food'),
    path('report/', views.report, name='report'),
    path('search-donation-centers/', views.search_donation_centers, name='search_donation_centers'),
]
