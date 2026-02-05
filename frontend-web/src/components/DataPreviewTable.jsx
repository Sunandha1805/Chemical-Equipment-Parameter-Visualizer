import React from 'react';

const DataPreviewTable = ({ data }) => {
    if (!data || !data.data_preview || data.data_preview.length === 0) return null;

    const preview = data.data_preview;
    const headers = Object.keys(preview[0]);

    const headerStyle = {
        padding: '12px 16px',
        textAlign: 'left',
        borderBottom: '2px solid var(--slate-200)',
        color: 'var(--slate-600)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        fontWeight: 700,
        backgroundColor: 'var(--slate-50)'
    };

    const cellStyle = {
        padding: '12px 16px',
        borderBottom: '1px solid var(--slate-100)',
        color: 'var(--slate-700)',
        fontSize: '0.875rem'
    };

    return (
        <section className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--slate-200)' }}>
                <h3 style={{ margin: 0 }}>Dataset Preview (First 10 Rows)</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th key={header} style={headerStyle}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {preview.map((row, i) => (
                            <tr key={i} style={{ transition: 'var(--transition)' }}>
                                {headers.map(header => (
                                    <td key={header} style={cellStyle}>{row[header]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default DataPreviewTable;
