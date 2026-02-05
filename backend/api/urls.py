from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import FileUploadView, FileListView, LatestSummaryView, DownloadReportView

urlpatterns = [
    path('login/', obtain_auth_token, name='api-login'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('summary/latest/', LatestSummaryView.as_view(), name='latest-summary'),
    path('history/', FileListView.as_view(), name='file-history'),
    path('report/<int:pk>/', DownloadReportView.as_view(), name='download-report'),
]
