from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.urls import path, include


def home(request):
    return JsonResponse({"message": "Benvenuto in SmartTasks API!"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tasks.urls')),
]