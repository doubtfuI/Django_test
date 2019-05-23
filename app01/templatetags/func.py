from django import template

register = template.Library()


@register.simple_tag
def add_s(a1, a2):
    return a1 + a2


@register.filter()
def add_f(a1, a2):
    return a1 + a2
