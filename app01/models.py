from django.db import models


class User(models.Model):
    name = models.CharField(max_length=32, null=False)
    age = models.IntegerField(null=False)
    gender = models.CharField(max_length=32, null=False)
    school = models.ForeignKey('School', to_field='id', on_delete=models.PROTECT)


class School(models.Model):
    s_name = models.CharField(max_length=32, null=False)
