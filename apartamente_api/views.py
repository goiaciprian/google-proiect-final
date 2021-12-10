from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


@api_view(['GET'])
def api_overview(request):

    api_urls = {
        'Get Apartamente GET': '/apartamente/',
        'Create / Update Apartamente POST': '/apartamente/',
        'Delete Apartamente DELETE': '/apartamente/<int:id>/',
    }

    return Response(api_urls)
