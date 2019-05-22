from django.shortcuts import render, redirect, HttpResponse
from app01 import models


URL = {'index': 'index.html',
       'ajax1': 'ajax1.html',
       'm2m': 'm2m.html',
       'option': 'option.html',
       'table': 'dict_in_table.html',
       }


def index(request):
    return render(request, 'index.html', {'url': URL})


# ajax基础使用
def ajax1(request):
    user = models.User.objects.all().values('id', 'name', 'age', 'gender', 'school__s_name')
    school = models.School.objects.all().values('id', 's_name')
    if request.method == 'GET':
        return render(request, 'ajax1.html', {'url': URL, 'user_list': user, 'school_list': school})
    elif request.method == 'POST':
        print('sth post')
        name = request.POST.get('name', None)
        print(name)
        age = request.POST.get('age', None)
        print(age)
        gender = request.POST.get('gender', None)
        print(gender)
        school = request.POST.get('school', None)
        print(school)
        method = request.POST.get('method', None)
        print(method)
        if method == 'del':
            u_id = request.POST.get('id', None)
            models.User.objects.filter(id=u_id).delete()
            return HttpResponse('Done')
        elif len(name) < 1:
            return HttpResponse('please input the name')
        elif len(age) < 1:
            return HttpResponse('please input the age')
        elif len(gender) < 1:
            return HttpResponse('please choose the gender')
        elif len(school) < 1:
            return HttpResponse('please choose the school')
        elif method == 'add':
            school_obj = models.School.objects.filter(s_name=school).first()
            models.User.objects.create(name=name, age=age, gender=gender, school=school_obj)
            return HttpResponse('Done')
        elif method == 'edit':
            u_id = request.POST.get('id', None)
            school_obj = models.School.objects.filter(s_name=school).first()
            models.User.objects.filter(id=u_id).update(name=name, age=age, gender=gender, school=school_obj)
            return HttpResponse('Done')


# Django orm 多对多操作
def m2m(request):
    choose_list = models.Course.objects.all()
    student_list = models.User.objects.all()
    course_list = models.Course.objects.all()
    return render(request, 'm2m.html', {'choose_list': choose_list, 'student_list': student_list,
                                        'course_list': course_list})


# 获取数据库数据方法
def dict_in_table(request):
    v1 = models.User.objects.all()
    # 对象列表
    v2 = models.User.objects.all().values('id', 'name', 'age', 'gender', 'school__s_name')
    # 字典列表 'school__s_name': 'A school'
    v25 = models.User.objects.all().values()
    # 字典列表 'school_id': 1
    v3 = models.User.objects.all().values_list('id', 'name', 'age', 'gender', 'school__s_name')
    # 元祖列表 'A school'
    v35 = models.User.objects.all().values_list()
    # 元祖列表 1
    print(v1)
    print(v2)
    print(v25)
    print(v3)
    print(v35)
    return HttpResponse('Done')


# 数据库添加数据
def option(request):
    if request.method == 'GET':
        # 为id=1的课程添加学生
        # obj1 = models.Course.objects.filter(id=1).first()
        # obj1.r.add(3, 4, 5, 6)
        # obj2 = models.Course.objects.filter(id=2).first()
        # obj2.r.add(3, 5, 6)
        # obj3 = models.Course.objects.filter(id=3).first()
        # obj3.r.add(6)
        # obj4 = models.Course.objects.filter(id=4).first()
        # obj4.r.add(4, 5)
        # 添加课程
        # models.Course.objects.create(c_name='Chinese')
        # models.Course.objects.create(c_name='math')
        # models.Course.objects.create(c_name='English')
        # models.Course.objects.create(c_name='history')
        # 添加学校
        # models.School.objects.create(s_name='A school')
        # models.School.objects.create(s_name='B school')
        # 添加学生
        # models.User.objects.create(name='bob', age=3, gender='M', school_id=1)
        # models.User.objects.create(name='jack', age=4, gender='M', school_id=2)
        # models.User.objects.create(name='alice', age=3, gender='F', school_id=1)
        # models.User.objects.create(name='lucy', age=5, gender='F', school_id=2)
        return HttpResponse('done')
