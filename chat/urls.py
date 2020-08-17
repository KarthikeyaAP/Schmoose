from django.urls import path,include
from . import views

urlpatterns=[
    path('',views.index, name ='index'),
    path('login/',views.login_view,name='login'),
    path('logout/',views.logout_view,name='logout'),
    path('register/',views.register,name='register'),
    path('general/',views.general,name='general'),
    path('books/',views.books,name='books'),
    path('courses/',views.courses,name='courses')
]
