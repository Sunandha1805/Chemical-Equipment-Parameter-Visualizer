import pandas as pd
import json

def process_csv_data(file_path):
    """
    Analyzes CSV data using Pandas and returns summary statistics.
    Requirements:
    - Total equipment count
    - Average flowrate
    - Average pressure
    - Average temperature
    - Equipment type distribution
    """
    try:
        df = pd.read_csv(file_path)
        
        # Validation: Check for required columns
        required_columns = ['Type', 'Flowrate', 'Pressure', 'Temperature']
        missing = [col for col in required_columns if col not in df.columns]
        if missing:
            return {"error": f"Missing required columns: {', '.join(missing)}"}

        # 1. Total Equipment Count
        total_count = len(df)
        
        # 2. Average Calculations (handling missing values with mean)
        # Expected columns: 'Flowrate', 'Pressure', 'Temperature'
        avg_flowrate = df['Flowrate'].mean() if 'Flowrate' in df.columns else 0
        avg_pressure = df['Pressure'].mean() if 'Pressure' in df.columns else 0
        avg_temperature = df['Temperature'].mean() if 'Temperature' in df.columns else 0
        
        # 3. Type Distribution
        # Expected column: 'Type'
        type_distribution = {}
        if 'Type' in df.columns:
            type_distribution = df['Type'].value_counts().to_dict()
            
        stats = {
            "total_equipment_count": int(total_count),
            "average_flowrate": round(float(avg_flowrate), 2),
            "average_pressure": round(float(avg_pressure), 2),
            "average_temperature": round(float(avg_temperature), 2),
            "type_distribution": type_distribution,
            "raw_data": df.head(10).to_dict(orient='records')
        }
        
        return stats
    except Exception as e:
        return {"error": str(e)}
