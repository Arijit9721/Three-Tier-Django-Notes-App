from django.db import models

class Todo(models.Model):
    text = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text  

class Note(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)  # Link notes to users
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title  # Corrected from self.text to self.title
