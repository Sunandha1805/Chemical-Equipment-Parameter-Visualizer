import React from 'react';

const IntroState = ({ history, onUploadClick, onViewLastClick }) => {
    const hasHistory = history && history.length > 0;
    const lastDataset = hasHistory ? history[0] : null;

    const getFilename = (url) => {
        if (!url) return 'Unknown file';
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        return new Date(dateString).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center',
            padding: '4rem 1rem',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%'
        }}>
            <div style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>📊</div>
            <h2 style={{ fontSize: '2.75rem', marginBottom: '1rem', color: 'var(--slate-900)', fontWeight: '800' }}>
                Chemical Equipment Visualizer
            </h2>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--slate-500)', marginBottom: '2.5rem' }}>
                No dataset currently loaded.
            </p>

            <div style={{ marginBottom: '4rem' }}>
                <button 
                    onClick={onUploadClick}
                    style={{
                        backgroundColor: 'var(--primary-600)',
                        color: 'white',
                        border: 'none',
                        padding: '16px 40px',
                        borderRadius: '12px',
                        fontSize: '1.15rem',
                        fontWeight: '600',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-700)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-600)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    📁 Upload CSV File
                </button>
            </div>

            {hasHistory ? (
                <>
                    <div className="card" style={{ 
                        textAlign: 'left', 
                        padding: '2rem', 
                        width: '100%',
                        backgroundColor: 'var(--slate-50)',
                        border: '1px dashed var(--slate-300)',
                        borderRadius: '16px',
                        marginBottom: '4rem'
                    }}>
                        <h3 style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
                            Supported CSV Format
                        </h3>
                        <ul style={{ 
                            listStyle: 'none', 
                            padding: 0, 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '1rem',
                            color: 'var(--slate-700)',
                            fontWeight: '500'
                        }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--primary-600)', fontSize: '1.2rem' }}>•</span> Equipment Name
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--primary-600)', fontSize: '1.2rem' }}>•</span> Type
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--primary-600)', fontSize: '1.2rem' }}>•</span> Flowrate
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--primary-600)', fontSize: '1.2rem' }}>•</span> Pressure
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--primary-600)', fontSize: '1.2rem' }}>•</span> Temperature
                            </li>
                        </ul>
                    </div>

                    <div style={{
                        width: '100%',
                        padding: '2.5rem',
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid var(--slate-100)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <h4 style={{ color: 'var(--slate-800)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                            Last uploaded dataset available:
                        </h4>
                        
                        <div style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '0.75rem', 
                            marginBottom: '2rem',
                            textAlign: 'left',
                            fontSize: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-700)' }}>
                                <span style={{ fontSize: '1.2rem' }}>📁</span> 
                                <strong>Filename:</strong> {getFilename(lastDataset.file)}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-700)' }}>
                                <span style={{ fontSize: '1.2rem' }}>🕒</span> 
                                <strong>Upload time:</strong> {formatDate(lastDataset.uploaded_at)}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-700)' }}>
                                <span style={{ fontSize: '1.2rem' }}>🔢</span> 
                                <strong>Total equipment count:</strong> {lastDataset.statistics?.total_equipment_count || 'N/A'}
                            </div>
                        </div>

                        <button 
                            onClick={onViewLastClick}
                            style={{
                                backgroundColor: 'white',
                                color: 'var(--primary-600)',
                                border: '2px solid var(--primary-600)',
                                padding: '12px 32px',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary-50)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                            }}
                        >
                            👁️ View Previous Analysis
                        </button>
                    </div>
                </>
            ) : (
                <div style={{
                    width: '100%',
                    padding: '2rem',
                    backgroundColor: 'var(--slate-50)',
                    borderRadius: '16px',
                    color: 'var(--slate-400)',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    border: '1px solid var(--slate-100)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px', opacity: 0.5 }}>📂</div>
                    No previous analysis available
                </div>
            )}
        </div>
    );
};

export default IntroState;
