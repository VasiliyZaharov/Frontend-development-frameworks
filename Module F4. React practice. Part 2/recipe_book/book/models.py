from django.db import models


class Recipe(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField(max_length=64)

    def __str__(self):
        return self.title
