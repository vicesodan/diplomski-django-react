from django.shortcuts import render
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
import pyodbc
import json
import csv
import time


conn1=pyodbc.connect(
            "Driver={ODBC Driver 17 for SQL Server};"
            "Server=LAPTOP-5SM6HC21\MSSQLSERVER01,1434;"
            "Database=AdnetNetworkModel;"
            "Trusted_Connection=yes;"
        )



conn2=pyodbc.connect(
            "Driver={ODBC Driver 17 for SQL Server};"
            "Server=LAPTOP-5SM6HC21\MSSQLSERVER01,1434;"
            "Database=AdnetNetworkModelABB;"
            "Trusted_Connection=yes;"
        )    

timestr = time.strftime("%Y_%m_%d")



class Popis(APIView):

    def get(request, self):

        Q1=("SELECT Name, PowerSystemResourceId FROM PowerSystemResource  where ParentId = 'ef680b6e-fac6-423d-8312-84da454d56b9'")

        cursor=conn1.cursor()
        cursor.execute(Q1)
        rows=cursor.fetchall()
        result = []
        keys = ('name','id')
        for row in rows:
            result.append(dict(zip(keys,row)))

        
        return Response(result, status=status.HTTP_200_OK)



class Izbor(APIView):
    lookup_url_kwarg = "mreza"
    
    def get (self, request):
                
        mreza = request.GET.get(self.lookup_url_kwarg)
        Izbor.ime = "'" + mreza + "'"
        
        Q2=("SELECT Name, PowerSystemResourceId from PowerSystemResource WHERE ParentId=" + Izbor.ime)

        cursor=conn1.cursor()
        cursor.execute(Q2)
        rows=cursor.fetchall()
        result = []
        keys = ('name', 'id')
        for row in rows:
            result.append(dict(zip(keys,row)))
        
        return Response(result, status=status.HTTP_200_OK)
    


class Export(Izbor, APIView):

    def get(self, request):

        ime = Izbor.ime
        Q3=("SELECT TOP (1000) AcLineSegmentId, KeyUnplanned, UcteDefName, Name, PowerSystemResourceId, Alias, BaseVoltageId, L, R, X, B, R0, X0, B0, Sn, Imax FROM PowerSystemResource, AcLineSegment, Area, Station where PowerSystemResourceId=" + ime)

        cursor=conn1.cursor()
        cursor.execute(Q3)
        result=cursor.fetchall()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="Parametri_{}.csv"'.format(timestr)

        writer = csv.writer(response)
        writer.writerow(['AcLineID','State','Station','Name', 'PowerSystemResourceId', 'Alias', 'BaseVoltageId','L','R','X','B','R0','X0','B0','Sn','Imax'])

        for user in result:
            writer.writerow(user)

        return response



class PopisABB(APIView):

    def get(request, self):
        
        Q1=("SELECT Name, PowerSystemResourceId FROM PowerSystemResource where ParentId = '2d11102b-bae6-7145-a51d-835254d8287c'")

        cursor=conn2.cursor()
        cursor.execute(Q1)
        rows=cursor.fetchall()
        result = []
        keys = ('name','id')
        for row in rows:
            result.append(dict(zip(keys,row)))

        
        return Response(result, status=status.HTTP_200_OK)
    

class IzborABB(APIView):
    lookup_url_kwarg = "mreza"


    def get (self, request, format=None):
    
        mreza = request.GET.get(self.lookup_url_kwarg)
        IzborABB.ime = "'" + mreza + "'"
        Q2=("SELECT Name, PowerSystemResourceId from PowerSystemResource WHERE ParentId=" + IzborABB.ime)

        cursor=conn2.cursor()
        cursor.execute(Q2)
        rows=cursor.fetchall()
        result = []
        keys = ('name', 'id')

        for row in rows:
            result.append(dict(zip(keys,row)))

        return Response(result, status=status.HTTP_200_OK)

class ExportABB(IzborABB, APIView):
    
    def get(self, request):

        ime = IzborABB.ime
        Q3=("SELECT TOP (1000) AcLineSegmentId, KeyUnplanned, UcteDefName, Name, PowerSystemResourceId, Alias, BaseVoltageId, L, R, X, B, R0, X0, B0, Sn, Imax FROM PowerSystemResource, AcLineSegment, Area, Station where PowerSystemResourceId=" + ime)

        cursor=conn2.cursor()
        cursor.execute(Q3)
        result=cursor.fetchall()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attacwadhment; filename="Parametri_{}.csv"'.format(timestr)

        writer = csv.writer(response)
        writer.writerow(['AcLineID','State','Station','Name', 'PowerSystemResourceId', 'Alias', 'BaseVoltageId','L','R','X','R0','X0','B0','Sn','Imax'])

        for user in result:
            writer.writerow(user)

        return response