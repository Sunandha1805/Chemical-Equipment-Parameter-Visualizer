import React, { useState, useEffect, useRef } from 'react';
import FileUpload from './components/FileUpload';
import Summary from './components/Summary';
import Charts from './components/Charts';
import HistoryTable from './components/HistoryTable';
import DataPreviewTable from './components/DataPreviewTable';
import IntroState from './components/IntroState';
import { getLatestSummary, setAuthToken, getHistory } from './services/api';

// Fixed token for development (Updated after database reset)
setAuthToken("8abb65433a2f9d94ee8f86a67f49c5d4026fb0f2");

function App() {
    const [uiState, setUiState] = useState('intro_state'); // intro_state | viewing_previous_analysis | viewing_current_upload
    const [latestData, setLatestData] = useState(null);
    const [history, setHistory] = useState([]);
    const [hasSelectedFile, setHasSelectedFile] = useState(false);
    const fileUploadRef = useRef(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await getHistory();
            setHistory(response.data);
        } catch (err) {
            console.log('History could not be fetched.');
        }
    };

    const handleUploadSuccess = (newData) => {
        setLatestData(newData);
        setUiState('viewing_current_upload');
        setHasSelectedFile(false);
        fetchHistory(); // Refresh history
    };

    const handleViewLast = () => {
        if (history && history.length > 0) {
            // The first item in history is the latest one (sorted by backend)
            setLatestData(history[0]);
            setUiState('viewing_previous_analysis');
        }
    };

    const handleUploadClick = () => {
        if (fileUploadRef.current) {
            fileUploadRef.current.openFileDialog();
        }
    };

    const resetToIntro = () => {
        setLatestData(null);
        setUiState('intro_state');
        setHasSelectedFile(false);
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--slate-50)' }}>
            {/* Header / Navbar */}
            <nav style={{ 
                backgroundColor: 'var(--white)', 
                borderBottom: '1px solid var(--slate-200)',
                padding: '1rem 2rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div onClick={resetToIntro} style={{ cursor: 'pointer' }}>
                        <h1 style={{ fontSize: '1.25rem', color: 'var(--primary-600)', margin: 0 }}>Visualizer Pro</h1>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                        Intern Assessment Task
                    </div>
                </div>
            </nav>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                {uiState === 'intro_state' && (
                    <header style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Equipment Dashboard</h2>
                        <p style={{ color: 'var(--slate-500)', fontSize: '1.1rem' }}>
                            Upload datasets to monitor flowrate, pressure, and temperature metrics.
                        </p>
                    </header>
                )}

                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <section style={{ display: (uiState !== 'intro_state' || hasSelectedFile) ? 'block' : 'none' }}>
                        <FileUpload 
                            ref={fileUploadRef} 
                            onUploadSuccess={handleUploadSuccess} 
                            onFileSelect={(file) => setHasSelectedFile(!!file)}
                        />
                    </section>
                    
                    {uiState === 'intro_state' ? (
                        <IntroState 
                            history={history} 
                            onUploadClick={handleUploadClick}
                            onViewLastClick={handleViewLast}
                        />
                    ) : (
                        <>
                            <section>
                                <Summary data={latestData} />
                            </section>

                            <DataPreviewTable data={latestData} />
                            
                            <section className="card" style={{ padding: '32px' }}>
                                <h3 style={{ marginBottom: '24px' }}>Visual Analytics</h3>
                                <Charts data={latestData} />
                            </section>

                            <HistoryTable history={history} />
                        </>
                    )}
                </div>
            </main>
            {/* Removed the secondary hidden FileUpload as the primary one now handles intro state selection visibility */}
        </div>
    );
}

export default App;
