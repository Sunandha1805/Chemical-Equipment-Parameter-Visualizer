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
            textAlign: 'center',
            padding: 'var(--space-16) var(--space-4)',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
            gap: 'var(--space-12)'
        }}>
            {/* Hero / Branding Section */}
            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
                <div style={{ 
                    fontSize: '4.5rem', 
                    padding: 'var(--space-5)',
                    background: 'linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%)',
                    borderRadius: 'var(--radius-2xl)',
                    boxShadow: '0 20px 40px -10px hsla(250, 65%, 60%, 0.2)',
                    border: '1px solid var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>📊</div>
                <div>
                    <h2 style={{ fontSize: '3rem', marginBottom: 'var(--space-3)', color: 'var(--slate-900)', fontWeight: '800', letterSpacing: '-0.05em' }}>
                        Chemical Equipment Visualizer
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--slate-600)', maxWidth: '600px', margin: '0 auto', fontWeight: '400', opacity: 0.9 }}>
                        Upload document for monitoring flowrate, pressure, and temperature metrics.
                    </p>
                </div>
            </header>

            {/* Primary Action Section */}
            <div style={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 'var(--space-10)'
            }}>
                <button 
                    onClick={onUploadClick}
                    style={{
                        backgroundColor: 'var(--primary-600)',
                        color: 'white',
                        border: 'none',
                        padding: '20px 64px',
                        borderRadius: 'var(--radius-xl)',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        boxShadow: '0 15px 30px -5px hsla(250, 65%, 60%, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-700)';
                        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 20px 40px -5px hsla(250, 65%, 60%, 0.5)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-600)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 15px 30px -5px hsla(250, 65%, 60%, 0.4)';
                    }}
                >
                    📁 Upload New Dataset
                </button>

                {/* Supporting Info Pill */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(5px)',
                    padding: 'var(--space-2) var(--space-6)',
                    borderRadius: '100px',
                    border: '1px solid var(--slate-200)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-5)',
                    fontSize: '0.8rem',
                    color: 'var(--slate-500)',
                }}>
                    <span style={{ color: 'var(--slate-800)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.08em' }}>Recommended Columns</span>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', fontWeight: 600 }}>
                        {['Equipment Name', 'Type', 'Flowrate', 'Pressure', 'Temperature'].map((col, i) => (
                            <span key={col} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {i > 0 && <span style={{ width: '5px', height: '5px', backgroundColor: 'var(--primary-600)', opacity: 0.3, borderRadius: '50%' }}></span>}
                                {col}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {hasHistory ? (
                <div className="card" style={{
                    width: '100%',
                    marginTop: 'var(--space-8)',
                    padding: 'var(--space-10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-8)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', borderBottom: '1px solid var(--slate-100)', paddingBottom: 'var(--space-5)' }}>
                        <h4 style={{ color: 'var(--slate-800)', margin: 0, fontSize: '1.25rem', fontWeight: '800' }}>
                            Recently Analyzed
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary-600)', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.1em', background: 'var(--primary-50)', padding: '4px 12px', borderRadius: '100px' }}>History available</span>
                    </div>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr',
                        gap: 'var(--space-10)',
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '0.95rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-600)', padding: '12px', borderRadius: '14px', fontSize: '1.4rem' }}>📄</div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filename</div>
                                <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 700, color: 'var(--slate-800)', fontSize: '1rem' }}>
                                    {getFilename(lastDataset.file)}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-600)', padding: '12px', borderRadius: '14px', fontSize: '1.4rem' }}>🕒</div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uploaded At</div>
                                <div style={{ fontWeight: 700, color: 'var(--slate-800)', fontSize: '1rem' }}>{formatDate(lastDataset.uploaded_at)}</div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={onViewLastClick}
                        style={{
                            width: '100%',
                            backgroundColor: 'var(--white)',
                            color: 'var(--primary-600)',
                            border: '2px solid var(--primary-50)',
                            padding: '16px 0',
                            borderRadius: 'var(--radius-xl)',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'var(--transition)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary-600)';
                            e.currentTarget.style.transform = 'scale(1.01)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary-50)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Explore Previous Analysis <span>→</span>
                    </button>
                </div>
            ) : (
                <div style={{
                    width: '100%',
                    padding: 'var(--space-16)',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: 'var(--radius-2xl)',
                    color: 'var(--slate-400)',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    border: '2px dashed var(--slate-200)',
                    marginTop: 'var(--space-8)'
                }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)', opacity: 0.5 }}>✨</div>
                    <div style={{ fontWeight: 600 }}>Ready for your first equipment analysis</div>
                    <div style={{ fontSize: '0.9rem', marginTop: 'var(--space-2)', opacity: 0.8 }}>Upload a CSV to get started</div>
                </div>
            )}
        </div>
    );
};

export default IntroState;
