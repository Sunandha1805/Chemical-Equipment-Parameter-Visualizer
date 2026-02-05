from django.db import models
import os

class DataFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    statistics = models.JSONField(null=True, blank=True)
    data_preview = models.JSONField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Enforce "last 5 uploads only" logic
        # Count existing records
        max_files = 5
        existing_files = DataFile.objects.order_by('-uploaded_at')
        
        if existing_files.count() >= max_files:
            # Delete the oldest files if we exceed the limit
            # Note: We use [:count - max_files + 1] to handle cases where 
            # multiple files might need cleanup.
            files_to_delete = existing_files[max_files-1:]
            for old_file in files_to_delete:
                # Delete the physical file from storage
                if old_file.file:
                    if os.path.isfile(old_file.file.path):
                        os.remove(old_file.file.path)
                old_file.delete()
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"File uploaded at {self.uploaded_at}"
