import { downloadReport } from '../services/api';

const Summary = ({ data }) => {
    if (!data) return null;

    const { statistics } = data;

    const statCards = [
        { label: 'Equipment Units', value: statistics.total_equipment_count, icon: '⚙️', color: '#4f46e5' },
        { label: 'Avg Flowrate', value: statistics.average_flowrate, unit: ' m³/h', icon: '💧', color: '#06b6d4' },
        { label: 'Avg Pressure', value: statistics.average_pressure, unit: ' bar', icon: '🌡️', color: '#f59e0b' },
        { label: 'Avg Temperature', value: statistics.average_temperature, unit: ' °C', icon: '🔥', color: '#ef4444' },
    ];

    const getFilename = (url) => {
        if (!url) return 'Unknown file';
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    return (
        <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ marginBottom: '8px' }}>Dataset Analysis: {getFilename(data.file)}</h2>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--slate-500)', fontSize: '0.95rem' }}>
                        <span><span style={{ fontWeight: 600 }}>📁 File:</span> {getFilename(data.file)}</span>
                        <span><span style={{ fontWeight: 600 }}>🕒 Uploaded:</span> {new Date(data.uploaded_at).toLocaleString()}</span>
                    </div>
                </div>
                <button 
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        downloadReport(data.id, `report_${data.id}.pdf`);
                    }}
                    style={{
                        backgroundColor: 'var(--white)',
                        color: 'var(--slate-700)',
                        border: '1px solid var(--slate-300)',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'var(--transition)'
                    }}
                >
                    📥 Download Analysis Report (PDF)
                </button>

            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {statCards.map((stat, index) => (
                <div key={index} className="card" style={{ 
                    position: 'relative', 
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    {/* Subtle accent line */}
                    <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '4px', 
                        height: '100%', 
                        backgroundColor: stat.color 
                    }} />
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1.25rem' }}>{stat.icon}</span>
                        <span style={{ color: 'var(--slate-500)', fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {stat.label}
                        </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <h4 style={{ fontSize: '1.75rem', margin: 0 }}>{stat.value}</h4>
                        {stat.unit && <span style={{ color: 'var(--slate-400)', fontSize: '1rem' }}>{stat.unit}</span>}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Summary;
