from django.db import models

CATEGORY_CHOICES = [
    ('Vegetables', 'Vegetables'),
    ('Fruits', 'Fruits'),
    ('Meat', 'Meat'),
    ('Dairy', 'Dairy'),
    ('Bakery', 'Bakery'),
    ('Other', 'Other'),
]

QUANTITY_UNIT_CHOICES = [
    ('pcs', 'Pieces'),
    ('servings', 'Servings'),
    ('grams', 'Grams'),
    ('kg', 'Kilograms'),
    ('liters', 'Liters'),
    ('ml', 'Milliliters'),
]

class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    quantity_unit = models.CharField(max_length=20, choices=QUANTITY_UNIT_CHOICES, default='pcs')
    is_surplus = models.BooleanField(default=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class DonationCenter(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)

    def __str__(self):
        return self.name
