from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import DataFile
from .serializers import DataFileSerializer
from .utils import process_csv_data
from .reports import generate_pdf_report

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class DownloadReportView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            data_file = DataFile.objects.get(pk=pk)
            pdf_buffer = generate_pdf_report(data_file)
            
            response = HttpResponse(pdf_buffer.getvalue(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="report_{data_file.id}.pdf"'
            return response
        except DataFile.DoesNotExist:
            return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Log the error for debugging
            print(f"PDF Generation error: {str(e)}")
            return Response({"error": "Failed to generate PDF", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class FileUploadView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = DataFileSerializer(data=request.data)
        if file_serializer.is_valid():
            # Save the file first to get the path
            data_file = file_serializer.save()
            print(f"File saved successfully: {data_file.file.path}")
            
            # Perform Pandas analysis
            stats = process_csv_data(data_file.file.path)
            
            # Check for processing errors
            if "error" in stats:
                data_file.delete() # Clean up failed file
                return Response({"error": "Invalid CSV structure", "details": stats["error"]}, status=status.HTTP_400_BAD_REQUEST)
            
            # Save stats back to the model
            data_file.statistics = stats
            data_file.data_preview = stats.get("raw_data", [])
            data_file.save()
            
            return Response(DataFileSerializer(data_file).data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LatestSummaryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        latest_file = DataFile.objects.order_by('-uploaded_at').first()
        if latest_file:
            return Response(DataFileSerializer(latest_file).data)
        return Response({"detail": "No datasets found."}, status=status.HTTP_404_NOT_FOUND)

class FileListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        files = DataFile.objects.order_by('-uploaded_at')
        serializer = DataFileSerializer(files, many=True)
        return Response(serializer.data)
