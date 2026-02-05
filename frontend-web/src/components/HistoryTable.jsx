import React from 'react';
import { downloadReport } from '../services/api';

const HistoryTable = ({ history }) => {
    if (!history || history.length === 0) return null;

    const tableHeaderStyle = {
        padding: '16px',
        textAlign: 'left',
        borderBottom: '1px solid var(--slate-200)',
        color: 'var(--slate-500)',
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 600
    };

    const tableCellStyle = {
        padding: '16px',
        borderBottom: '1px solid var(--slate-100)',
        fontSize: '0.925rem'
    };

    return (
        <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--slate-200)' }}>
                <h3 style={{ margin: 0 }}>Recent Datasets (Last 5)</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: 'var(--slate-50)' }}>
                        <tr>
                            <th style={tableHeaderStyle}>ID</th>
                            <th style={tableHeaderStyle}>Filename</th>
                            <th style={tableHeaderStyle}>Uploaded At</th>
                            <th style={tableHeaderStyle}>Units</th>
                            <th style={tableHeaderStyle}>Avg Temp</th>
                            <th style={tableHeaderStyle}>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id} style={{ transition: 'var(--transition)' }}>
                                <td style={tableCellStyle}>#{item.id}</td>
                                <td style={{ ...tableCellStyle, fontWeight: 500 }}>{item.filename}</td>
                                <td style={tableCellStyle}>{new Date(item.uploaded_at).toLocaleString()}</td>
                                <td style={tableCellStyle}>{item.statistics.total_equipment_count}</td>
                                <td style={tableCellStyle}>{item.statistics.average_temperature}°C</td>
                                <td style={tableCellStyle}>
                                    <button 
                                        type="button"
                                        onClick={(e) => {
                                            console.log("Download button clicked for ID:", item.id);
                                            e.preventDefault();
                                            e.stopPropagation();
                                            downloadReport(item.id, `report_${item.id}.pdf`);
                                        }}
                                        style={{ 
                                            color: 'var(--primary-600)', 
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 0,
                                            font: 'inherit',
                                            fontWeight: 600,
                                            textDecoration: 'none'
                                        }}
                                    >
                                        DOWNLOAD PDF
                                    </button>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default HistoryTable;
