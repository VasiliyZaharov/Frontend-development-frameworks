# from django.urls import path
# from . import views

# urlpatterns = [
#     path('categories/', views.CategoryList.as_view(), name='category-list'),
#     path('categories/<int:pk>/', views.CategoryDetail.as_view(), name='category-detail'),
#     path('recipes/', views.RecipeList.as_view(), name='recipe-list'),
#     path('recipes/<int:pk>/', views.RecipeDetail.as_view(), name='recipe-detail'),
# ]
from django.urls import path
from . import views

urlpatterns = [
    path('api/categories/', views.CategoryList.as_view(), name='category-list'),
    path('api/categories/<int:pk>/', views.CategoryDetail.as_view(), name='category-detail'),
    path('api/recipes/', views.RecipeList.as_view(), name='recipe-list'),
    path('api/recipes/<int:pk>/', views.RecipeDetail.as_view(), name='recipe-detail'),
]





