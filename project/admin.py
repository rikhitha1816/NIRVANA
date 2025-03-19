from django.contrib import admin
from .models import (
    UserProfile,
    MenCollection,
    WomenCollection,
    Accessories,
    LatestArrivals,
)

admin.site.register(UserProfile)
admin.site.register(MenCollection)
admin.site.register(WomenCollection)
admin.site.register(Accessories)
admin.site.register(LatestArrivals)
