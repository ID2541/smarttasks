from rest_framework import viewsets
from .models import Project, Column, Task
from .serializers import ProjectSerializer, ColumnSerializer, TaskSerializer

# Gestione dei Progetti
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('id')
    serializer_class = ProjectSerializer


# Gestione delle Colonne del Kanban
class ColumnViewSet(viewsets.ModelViewSet):
    # ✅ Correzione: ordinamento per 'position', non 'order'
    queryset = Column.objects.all().order_by('position')
    serializer_class = ColumnSerializer


# Gestione dei Task
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer
