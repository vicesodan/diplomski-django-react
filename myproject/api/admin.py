from django.contrib import admin

# Register your models here.
from .models import HopsUser

admin.site.register(HopsUser)