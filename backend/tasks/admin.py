# backend/tasks/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Project, Column, Task

admin.site.register(User, BaseUserAdmin)
admin.site.register(Project)
admin.site.register(Column)
admin.site.register(Task)
