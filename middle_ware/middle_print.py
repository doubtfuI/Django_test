from django.utils.deprecation import MiddlewareMixin


class First(MiddlewareMixin):

    def process_request(self, request):
        print('First request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('First view')

    def process_exception(self, request, exception):
        if isinstance(exception, Exception):
            print('First find error')

    def process_template_response(self, request, response):
        # 当views中返回一个render时执行
        pass

    def process_response(self, request, response):
        print('First response')
        return response


class Second(MiddlewareMixin):

    def process_request(self, request):
        from django.shortcuts import HttpResponse
        print('Second request')
        # return HttpResponse('second forbidden')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('Second view')

    def process_exception(self, request, exception):
        from django.shortcuts import HttpResponse
        if isinstance(exception, Exception):
            print('Second find error')
            return HttpResponse('sth error')

    def process_response(self, request, response):
        print('Second response')
        return response


class Third(MiddlewareMixin):

    def process_request(self, request):
        print('Third request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('Third view')

    def process_exception(self, request, exception):
        if isinstance(exception, Exception):
            print('Third find error')

    def process_response(self, request, response):
        print('Third response')
        return response
