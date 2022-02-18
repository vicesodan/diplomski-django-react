from rest_framework import serializers
from .models import Hops, Baza



class PopisImena(serializers.ModelSerializer):
    class Meta:
        model = Hops
        fields = ('mreza')


class IzborBaze(serializers.ModelSerializer):
    class Meta:
        model = Baza
        fields = ('data_base_Choice')