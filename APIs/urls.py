from django.urls import path
from .views import TodoListCreateView, TodoUpdateDeleteView, health_check

urlpatterns = [
    path("todos/", TodoListCreateView.as_view(), name="todo-list-create"),
    path("todos/<int:pk>/", TodoUpdateDeleteView.as_view(), name="todo-update-delete"),
    path('health/', health_check, name='health_check'),
]