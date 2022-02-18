from django.urls import path
from .views import Izbor, Popis, PopisABB, IzborABB, Export, ExportABB

urlpatterns = [
    path('popis', Popis.as_view()),
    path('popisabb', PopisABB.as_view()),
    path('get-izbor', Izbor.as_view()),
    path('get-izborabb', IzborABB.as_view()),
    path('excel', Export.as_view()),
    path('excelabb', ExportABB.as_view()),
]

