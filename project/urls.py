from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LogoutView
from .views import (
    add_to_favorites,
    remove_from_favorites,
    favorites_list,
)

urlpatterns = [
    # General Pages
    path("", views.home, name="home"),  # Landing page
    path("index/", views.index, name="index"),  # Main page after login
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("faq/", views.faq, name="faq"),
    path("privacy/", views.privacy, name="privacy"),
    path("terms/", views.terms, name="terms"),
    path("collections/", views.collections, name="collections"),
    path("latest_arrivals/", views.latest_arrivals, name="latest_arrivals"),
    # Collection Pages
    path("women/", views.womens_collection, name="womens_collection"),
    path("men/", views.mens_collection, name="mens_collection"),
    path("accessories/", views.accessories_collection, name="accessories_collection"),
    # Authentication
    path("register/", views.register, name="register"),
    path(
        "login/",
        auth_views.LoginView.as_view(
            template_name="login.html", redirect_authenticated_user=True
        ),
        name="login",
    ),
    path("logout/", LogoutView.as_view(next_page="home"), name="logout"),
    # Password Management
    path(
        "password-reset/",
        auth_views.PasswordResetView.as_view(template_name="password_reset.html"),
        name="password_reset",
    ),
    path(
        "password-reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="password_reset_done.html"
        ),
        name="password_reset_done",
    ),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="password_reset_confirm.html"
        ),
        name="password_reset_confirm",
    ),
    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="password_reset_complete.html"
        ),
        name="password_reset_complete",
    ),
    # Profile Management
    path("profile/", views.profile_view, name="profile"),
    path("profile/update/", views.update_profile, name="update_profile"),
    path(
        "profile/update-image/", views.update_profile_image, name="update_profile_image"
    ),
    # Favorites Functionality
    path(
        "favorites/add/<int:item_id>/<str:item_type>/",
        add_to_favorites,
        name="add_to_favorites",
    ),
    path(
        "favorites/remove/<int:item_id>/<str:item_type>/",
        remove_from_favorites,
        name="remove_from_favorites",
    ),
    path("favorites/", favorites_list, name="favorites_list"),
]
