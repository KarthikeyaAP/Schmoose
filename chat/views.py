from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from .models import User
from django.contrib.auth.decorators import login_required

# Create your views here.

def index(request):
    return render(request,'chat/index.html')


def login_view(request):
    if request.method=='POST':
        username=request.POST.get('username')
        password=request.POST.get('password')
        user=authenticate(request,username=username,password=password)

        if user is not None:
            login(request,user)
            return HttpResponseRedirect('/')
        else:
            return render(request,'chat/login.html',{
                'message':'Invalid Credentials'
            })
    else:
        return render(request,'chat/login.html')


def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')

def register(request):
    if request.method=="POST":
        form=request.POST
        username=form.get('username')
        email=form.get('email')
        password=form.get('password')
        confirm=form.get('confirmation')
        if not password==confirm:
            return render(request,'chat/register.html',{
                'message':'Passwords does not match'
            })

        user = User.objects.create_user(username, email, password)
        user.save()        
        login(request,user)
        return HttpResponseRedirect('/')
    else:
        return render(request,'chat/register.html')
            
@login_required
def general(request):
    return render(request,"chat/general.html")
@login_required
def courses(request):
    return render(request,'chat/courses.html')
@login_required
def books(request):
    return render(request,'chat/books.html')