from django.urls import path
from .views import index
from api.views import Export

urlpatterns = [
    path('', index),
    path('adnet', index),
    path('adnetabb', index),
    path('endPage', index),
    path('database', index),
]