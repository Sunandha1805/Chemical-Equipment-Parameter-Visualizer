from rest_framework import serializers
from .models import DataFile

class DataFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFile
        fields = ['id', 'file', 'uploaded_at', 'statistics', 'data_preview']
        read_only_fields = ['uploaded_at', 'statistics', 'data_preview']
