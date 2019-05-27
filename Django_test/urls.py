from django.contrib import admin
from django.urls import path, re_path, include
from app01 import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^login.html$', views.login),

    path('', views.index),
    re_path(r'^index.html$', views.index),
    re_path(r'^ajax1.html$', views.ajax1),
    re_path(r'^m2m.html$', views.m2m),
    re_path(r'^option.html$', views.option),
    re_path(r'^dict_in_table.html$', views.dict_in_table),

    re_path(r'^block-(?P<page>\d+).html$', views.block),
    re_path(r'^simple_tag.html$', views.simple_tag),
    re_path(r'^page-(?P<page>\d+).html$', views.page),

    re_path(r'^session.html$', views.session),
    re_path(r'^csrf.html$', views.csrf),
]
