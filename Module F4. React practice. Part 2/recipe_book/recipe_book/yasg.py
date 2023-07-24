from django.urls import path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="Recipe Book",
        default_version="V1",
        description="Recipe Book API",
    ),
    public=True,
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger'), name='schema-swagger-ui')
]