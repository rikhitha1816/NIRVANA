from django.contrib.auth.models import User
from django.db import models

# Men Collection
class MenCollection(models.Model):
    CATEGORY_CHOICES = [
        ('business', 'Business Collection'),
        ('outerwear', 'Outerwear'),
        ('casual', 'Casual Wear'),
        ('suits', 'Suits'),
    ]
    
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)  
    image = models.ImageField(upload_to="men/")
    favorites = models.ManyToManyField(User, related_name="favorite_men", blank=True)

    def __str__(self):
        return self.name


# Women Collection
class WomenCollection(models.Model):
    CATEGORY_CHOICES = [
        ('summer', 'Summer Dresses'),
        ('casual', 'Casual Collection'),
        ('evening', 'Evening Wear'),
        ('dresses', 'Dresses'),
        ('tops', 'Tops'),
        ('bottoms', 'Bottoms'),
    ]
    
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True) 
    image = models.ImageField(upload_to="women/")
    favorites = models.ManyToManyField(User, related_name="favorite_women", blank=True)

    def __str__(self):
        return self.name


# Accessories Collection
class Accessories(models.Model):
    CATEGORY_CHOICES = [
        ('jewellery', 'Jewellery'),
        ('bags', 'Designer Bags'),
        ('scarves', 'Scarves and Belts'),
        ('watches', 'Watches'),
    ]
    
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)  
    image = models.ImageField(upload_to="accessories/")
    favorites = models.ManyToManyField(User, related_name="favorite_accessories", blank=True)

    def __str__(self):
        return self.name


# Latest Arrivals
class LatestArrivals(models.Model):
    CATEGORY_CHOICES = [
        ('summer', 'Summer Essentials'),
        ('evening', 'Evening Wear'),
        ('accessories', 'Accessories'),
        ('latest', 'Latest Arrivals'),
    ]
    
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True) 
    image = models.ImageField(upload_to="latest/")
    favorites = models.ManyToManyField(User, related_name="favorite_latest", blank=True)

    def __str__(self):
        return self.name


# User Profile
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to="profile_images/", default="profile_images/default-avatar.png")
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username
