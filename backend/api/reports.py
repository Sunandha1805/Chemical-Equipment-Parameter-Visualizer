from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
import io

def generate_pdf_report(equipment_file):
    """
    Generates a PDF report for a given EquipmentFile instance.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    # Title
    elements.append(Paragraph(f"Equipment Analysis Report", styles['Title']))
    elements.append(Spacer(1, 12))

    import os
    filename = os.path.basename(equipment_file.file.name)
    
    # Metadata
    elements.append(Paragraph(f"Filename: {filename}", styles['Normal']))
    elements.append(Paragraph(f"Uploaded at: {equipment_file.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')}", styles['Normal']))
    elements.append(Spacer(1, 24))

    # Statistics Table
    stats = equipment_file.statistics or {}
    data = [
        ["Metric", "Value"],
        ["Total Equipment", stats.get('total_equipment_count', 0)],
        ["Avg Flowrate", f"{stats.get('average_flowrate', 0)} m3/h"],
        ["Avg Pressure", f"{stats.get('average_pressure', 0)} bar"],
        ["Avg Temperature", f"{stats.get('average_temperature', 0)} C"],
    ]

    t = Table(data, colWidths=[200, 200])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.indigo),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    elements.append(t)
    elements.append(Spacer(1, 24))

    # Type Distribution
    elements.append(Paragraph("Type Distribution", styles['Heading2']))
    dist = stats.get('type_distribution', stats.get('equipment_type_distribution', {}))
    dist_data = [["Equipment Type", "Count"]]
    for k, v in dist.items():
        dist_data.append([k, v])
    
    dt = Table(dist_data, colWidths=[200, 200])
    dt.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    elements.append(dt)

    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer
