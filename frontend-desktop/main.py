import sys
import requests
import webbrowser
import os
import tempfile
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QPushButton, QLabel, QFileDialog, 
                             QTextEdit, QMessageBox, QTableWidget, QTableWidgetItem, QHeaderView)
from PyQt5.QtCore import Qt
import matplotlib.pyplot as plt
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas

class VisualizerApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Equipment Visualizer - Desktop")
        self.setGeometry(100, 100, 1100, 700)

        # Central Widget
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        
        # Main Layout
        self.layout = QVBoxLayout()
        self.central_widget.setLayout(self.layout)

        # 1. File Selection Area
        self.file_label = QLabel("No file selected")
        self.select_btn = QPushButton("Select CSV File")
        self.select_btn.clicked.connect(self.open_file_dialog)
        
        file_layout = QHBoxLayout()
        file_layout.addWidget(self.file_label)
        file_layout.addWidget(self.select_btn)
        self.layout.addLayout(file_layout)

        # 2. Controls Area
        controls_layout = QHBoxLayout()
        self.upload_btn = QPushButton("Analyze Data")
        self.upload_btn.setEnabled(False) 
        self.upload_btn.setFixedHeight(40)
        self.upload_btn.clicked.connect(self.upload_logic)
        
        self.pdf_btn = QPushButton("Download Analysis Report (PDF)")
        self.pdf_btn.setEnabled(False)
        self.pdf_btn.setFixedHeight(40)
        self.pdf_btn.clicked.connect(self.download_pdf)
        
        controls_layout.addWidget(self.upload_btn, 2)
        controls_layout.addWidget(self.pdf_btn, 1)
        self.layout.addLayout(controls_layout)

        # 3. Content Area
        main_content = QHBoxLayout()
        
        # Left side: Summary and Table
        left_side = QVBoxLayout()
        
        left_side.addWidget(QLabel("Data Summary:"))
        self.summary_display = QTextEdit()
        self.summary_display.setReadOnly(True)
        self.summary_display.setFixedHeight(150)
        left_side.addWidget(self.summary_display)
        
        left_side.addWidget(QLabel("Data Preview (First 10 Rows):"))
        self.data_table = QTableWidget()
        self.data_table.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)
        left_side.addWidget(self.data_table)
        
        main_content.addLayout(left_side, 1)

        # Right side: Plot
        right_side = QVBoxLayout()
        right_side.addWidget(QLabel("Visual Distribution:"))
        self.figure = plt.figure()
        self.canvas = FigureCanvas(self.figure)
        right_side.addWidget(self.canvas)
        main_content.addLayout(right_side, 1)

        self.layout.addLayout(main_content)

        self.selected_file_path = ""
        self.api_base = "http://127.0.0.1:8000/api"
        self.auth_token = "8abb65433a2f9d94ee8f86a67f49c5d4026fb0f2"
        self.current_data_id = None

    def open_file_dialog(self):
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getOpenFileName(self, "Select CSV File", "", "CSV Files (*.csv)", options=options)
        if file_path:
            self.selected_file_path = file_path
            self.file_label.setText(f"Selected: {file_path.split('/')[-1]}")
            self.upload_btn.setEnabled(True)

    def upload_logic(self):
        try:
            headers = {"Authorization": f"Token {self.auth_token}"}
            with open(self.selected_file_path, 'rb') as f:
                response = requests.post(f"{self.api_base}/upload/", files={'file': f}, headers=headers)
            
            if response.status_code == 201:
                data = response.json()
                self.current_data_id = data.get('id')
                self.pdf_btn.setEnabled(True)
                self.display_results(data)
            else:
                QMessageBox.warning(self, "Error", response.text)
        except Exception as e:
            QMessageBox.critical(self, "Error", str(e))

    def download_pdf(self):
        if self.current_data_id:
            try:
                url = f"{self.api_base}/report/{self.current_data_id}/"
                headers = {"Authorization": f"Token {self.auth_token}"}
                response = requests.get(url, headers=headers)
                
                if response.status_code == 200:
                    # Save to a temp file and open
                    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
                        tmp.write(response.content)
                        tmp_path = tmp.name
                    
                    # Open the file with the default PDF viewer
                    os.startfile(tmp_path)
                else:
                    QMessageBox.warning(self, "Error", f"Failed to download report: {response.text}")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"An error occurred: {str(e)}")

    def display_results(self, data):
        stats = data.get('statistics', {})
        
        # 1. Summary
        summary = (f"Total Count: {stats.get('total_equipment_count')}\n"
                   f"Avg Flowrate: {stats.get('average_flowrate')}\n"
                   f"Avg Pressure: {stats.get('average_pressure')}\n"
                   f"Avg Temp: {stats.get('average_temperature')}")
        self.summary_display.setText(summary)

        # 2. Table Preview
        preview = data.get('data_preview', [])
        if preview:
            self.data_table.setRowCount(len(preview))
            self.data_table.setColumnCount(len(preview[0]))
            self.data_table.setHorizontalHeaderLabels(preview[0].keys())
            
            for row_idx, row_data in enumerate(preview):
                for col_idx, (key, value) in enumerate(row_data.items()):
                    self.data_table.setItem(row_idx, col_idx, QTableWidgetItem(str(value)))

        # 3. Plot
        self.figure.clear()
        ax = self.figure.add_subplot(111)
        type_dist = stats.get('type_distribution', {})
        if type_dist:
            ax.bar(type_dist.keys(), type_dist.values(), color='indigo')
            ax.set_title("Distribution")
            plt.setp(ax.get_xticklabels(), rotation=45, ha='right')
        self.figure.tight_layout()
        self.canvas.draw()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = VisualizerApp()
    window.show()
    sys.exit(app.exec_())
