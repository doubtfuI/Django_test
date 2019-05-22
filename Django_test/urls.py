from django.contrib import admin
from django.urls import path, re_path
from app01 import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    re_path(r'^index.html$', views.index),
    re_path(r'^ajax1.html$', views.ajax1),
    re_path(r'^m2m.html$', views.m2m),
    re_path(r'^option.html$', views.option),
    re_path(r'^dict_in_table.html$', views.dict_in_table),
]
