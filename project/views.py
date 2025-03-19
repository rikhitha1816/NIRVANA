from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth import logout
from django.views.decorators.http import require_POST
from django.contrib import messages
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from datetime import datetime
from .models import (
    MenCollection,
    WomenCollection,
    Accessories,
    LatestArrivals,
    UserProfile,
)
from django.contrib.auth.models import User

# === GENERAL VIEWS ===
def index(request):
    return render(request, "index.html")

def home(request):
    men_items = MenCollection.objects.all()
    women_items = WomenCollection.objects.all()
    accessories = Accessories.objects.all()
    latest_arrivals = LatestArrivals.objects.all()

    total_users = UserProfile.objects.count()

    profile_image = None
    if request.user.is_authenticated:
        profile = UserProfile.objects.get_or_create(user=request.user)[0]
        profile_image = (
            profile.profile_image.url
            if profile.profile_image
            else "/media/profile_images/default-avatar.png"
        )

    context = {
        "men_items": men_items,
        "women_items": women_items,
        "accessories": accessories,
        "latest_arrivals": latest_arrivals,
        "total_users": total_users,
        "profile_image": profile_image,
    }

    if request.user.is_authenticated:
        return redirect("index")

    return render(request, "home.html", context)

def womens_collection(request):
    women_items = WomenCollection.objects.all()
    return render(request, "womens_collection.html", {"women_items": women_items})

def mens_collection(request):
    men_items = MenCollection.objects.all()
    return render(request, "mens_collection.html", {"men_items": men_items})

def accessories_collection(request):
    accessories = Accessories.objects.all()
    return render(request, "accessories_collection.html", {"accessories": accessories})

def latest_arrivals(request):
    latest_arrivals = LatestArrivals.objects.all()
    return render(request, "latest_arrivals.html", {"latest_arrivals": latest_arrivals})

def about(request):
    return render(request, "about.html")

def contact(request):
    if request.method == "POST":
        messages.success(request, "Thank you for your message!")
        return redirect("contact")
    return render(request, "contact.html")

from django.shortcuts import render
from .models import MenCollection, WomenCollection, Accessories

def collections(request):
    women_items = WomenCollection.objects.all()
    men_items = MenCollection.objects.all()
    accessories = Accessories.objects.all()
    latest_arrivals = LatestArrivals.objects.all()

    context = {
        'women_items': women_items,
        'men_items': men_items,
        'accessories': accessories,
        'latest_arrivals': latest_arrivals,
    }
    return render(request, 'collections.html', context)

def faq(request):
    return render(request, "faq.html")

def privacy(request):
    return render(request, "privacy.html")

def terms(request):
    return render(request, "terms.html")

def register(request):
    if request.method == 'POST':
        fullname = request.POST.get('fullname')
        email = request.POST.get('email')
        username = request.POST.get('username')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        terms = request.POST.get('terms')

        # Check if passwords match
        if password1 != password2:
            messages.error(request, "Passwords do not match!")
            return redirect('register')

        # Check if username already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
            return redirect('register')

        # Create user if validation passes
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password1,
            first_name=fullname.split(' ')[0],
            last_name=' '.join(fullname.split(' ')[1:])
        )

        # Create UserProfile
        UserProfile.objects.create(user=user)

        messages.success(request, "Registration successful!")
        return redirect('login')

    return render(request, 'register.html')

# === PROFILE MANAGEMENT ===
@login_required
def profile_view(request):
    profile = UserProfile.objects.get_or_create(user=request.user)[0]
    profile_image = (
        profile.profile_image.url
        if profile.profile_image
        else "/media/profile_images/default-avatar.png"
    )

    context = {
        "profile": profile,
        "profile_image": profile_image,
    }
    return render(request, "profile.html", context)

@login_required
def update_profile(request):
    user = request.user
    profile = UserProfile.objects.get_or_create(user=user)[0]

    if request.method == "POST":
        user.first_name = request.POST.get("first_name", "")
        user.last_name = request.POST.get("last_name", "")
        user.email = request.POST.get("email", "")
        user.save()

        profile.bio = request.POST.get("bio", "")
        profile.phone_number = request.POST.get("phone_number", "")
        profile.address = request.POST.get("address", "")

        birth_date = request.POST.get("birth_date")
        if birth_date:
            try:
                profile.birth_date = datetime.strptime(birth_date, "%Y-%m-%d")
            except ValueError:
                messages.error(request, "Invalid date format. Use YYYY-MM-DD.")
                return redirect("profile")

        if request.FILES.get("profile_image"):
            if profile.profile_image and "default-avatar.png" not in profile.profile_image.name:
                default_storage.delete(profile.profile_image.name)

            profile.profile_image = request.FILES.get("profile_image")

        profile.save()
        messages.success(request, "Profile updated successfully!")
        return redirect("profile")

    return redirect("profile")

@login_required
def update_profile_image(request):
    if request.method == "POST" and request.FILES.get("profile_image"):
        try:
            image = request.FILES["profile_image"]

            if not image.content_type.startswith("image/"):
                return JsonResponse({"success": False, "error": "Invalid file type."})

            if image.size > 5 * 1024 * 1024:
                return JsonResponse({"success": False, "error": "Maximum size is 5MB."})

            filename = f"profile_images/{request.user.username}_{image.name}"

            if request.user.profile.profile_image and "default-avatar.png" not in request.user.profile.profile_image.name:
                default_storage.delete(request.user.profile.profile_image.name)

            path = default_storage.save(filename, ContentFile(image.read()))
            request.user.profile.profile_image = path
            request.user.profile.save()

            return JsonResponse(
                {"success": True, "image_url": request.user.profile.profile_image.url}
            )

        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request"})

@login_required
def password_change_done(request):
    messages.success(request, "Your password was successfully updated!")
    return redirect("profile")

# === FAVORITES FUNCTIONALITY ===
@login_required
def add_to_favorites(request, item_id, item_type):
    model_mapping = {
        "men": MenCollection,
        "women": WomenCollection,
        "accessory": Accessories,
        "latest": LatestArrivals,
    }

    item = get_object_or_404(model_mapping[item_type], id=item_id)

    if not item.favorites.filter(id=request.user.id).exists():
        item.favorites.add(request.user)
        return JsonResponse({"success": True, "favorited": True})

    return JsonResponse({"success": False, "message": "Item already in favorites."})

@login_required
def remove_from_favorites(request, item_id, item_type):
    model_mapping = {
        "men": MenCollection,
        "women": WomenCollection,
        "accessory": Accessories,
        "latest": LatestArrivals,
    }

    item = get_object_or_404(model_mapping[item_type], id=item_id)

    if item.favorites.filter(id=request.user.id).exists():
        item.favorites.remove(request.user)
        return JsonResponse({"success": True, "favorited": False})

    return JsonResponse({"success": False, "message": "Item not in favorites."})

@login_required
def favorites_list(request):
    context = {
        "favorite_men": MenCollection.objects.filter(favorites=request.user),
        "favorite_women": WomenCollection.objects.filter(favorites=request.user),
        "favorite_accessories": Accessories.objects.filter(favorites=request.user),
        "favorite_latest": LatestArrivals.objects.filter(favorites=request.user),
    }
    return render(request, "favorites.html", context)

# === LOGOUT ===
@require_POST
def logout_view(request):
    logout(request)
    return redirect("home")
