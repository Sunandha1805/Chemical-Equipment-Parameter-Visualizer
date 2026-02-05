import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Charts = ({ data }) => {
    if (!data || !data.statistics) return null;

    const { statistics } = data;
    const typeData = statistics.type_distribution || statistics.equipment_type_distribution || {};

    const pieData = {
        labels: Object.keys(typeData),
        datasets: [
            {
                label: 'Distribution',
                data: Object.values(typeData),
                backgroundColor: [
                    '#4f46e5',
                    '#06b6d4',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                ],
                borderWidth: 0,
                hoverOffset: 12
            },
        ],
    };

    const barData = {
        labels: ['Flowrate', 'Pressure', 'Temp'],
        datasets: [
            {
                label: 'Averages',
                data: [
                    statistics.average_flowrate,
                    statistics.average_pressure,
                    statistics.average_temperature,
                ],
                backgroundColor: 'rgba(79, 70, 229, 0.8)',
                borderRadius: 6,
                hoverBackgroundColor: 'rgba(79, 70, 229, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: 'Outfit', size: 12 }
                }
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { family: 'Outfit', size: 14 },
                bodyFont: { family: 'Outfit', size: 13 },
                cornerRadius: 8,
            }
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ height: '350px' }}>
                <h4 style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--slate-600)' }}>Equipment Distribution</h4>
                <Pie data={pieData} options={options} />
            </div>
            <div style={{ height: '350px' }}>
                <h4 style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--slate-600)' }}>Parameter Comparison</h4>
                <Bar data={barData} options={{
                    ...options,
                    scales: {
                        y: { 
                            beginAtZero: true,
                            grid: { color: 'var(--slate-100)' },
                            ticks: { font: { family: 'Outfit' } }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { font: { family: 'Outfit' } }
                        }
                    }
                }} />
            </div>
        </div>
    );
};

export default Charts;
