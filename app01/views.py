from django.shortcuts import render, redirect, HttpResponse
from app01 import models


URL = {'index': 'index.html',
       'ajax1': 'ajax1.html',
       }


def index(request):
    return render(request, 'index.html', {'url': URL})


def ajax1(request):
    user = models.User.objects.all()
    if request.method == 'GET':
        return render(request, 'ajax1.html', {'url': URL, 'user_list': user})
    elif request.method == 'POST':
        print('sth post')
        name = request.POST.get('name', None)
        if len(name) < 2:
            return HttpResponse('too short')
        else:
            return HttpResponse('OK')


