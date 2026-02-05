import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { uploadFile } from '../services/api';

const FileUpload = forwardRef(({ onUploadSuccess, onFileSelect }, ref) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        openFileDialog: () => {
            fileInputRef.current.click();
        }
    }));

    const handleFileSelect = (file) => {
        if (!file) {
            if (onFileSelect) onFileSelect(null);
            return;
        }
        if (!file.name.endsWith('.csv')) {
            setError('Please select a valid CSV file.');
            setSelectedFile(null);
            if (onFileSelect) onFileSelect(null);
            return;
        }
        setError('');
        setSelectedFile(file);
        if (onFileSelect) onFileSelect(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setError('');
        try {
            const response = await uploadFile(selectedFile);
            onUploadSuccess(response.data);
            setSelectedFile(null); // Clear after success
            if (onFileSelect) onFileSelect(null);
        } catch (err) {
            setError(err.response?.data?.details || 'Upload failed. Check your file format.');
        } finally {
            setLoading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div 
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                    textAlign: 'center',
                    padding: '40px',
                    border: '2px dashed var(--slate-300)',
                    margin: '20px',
                    borderRadius: '12px',
                    backgroundColor: dragActive ? 'var(--primary-50)' : 'var(--slate-50)',
                    borderColor: dragActive ? 'var(--primary-600)' : 'var(--slate-300)',
                    transition: 'var(--transition)',
                    cursor: 'pointer'
                }}
                onClick={() => fileInputRef.current.click()}
            >
                <div style={{ fontSize: '2.5rem', color: 'var(--slate-400)', marginBottom: '12px' }}>
                    📁
                </div>
                <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>
                    {selectedFile ? 'Change selected file' : 'Click to select or drag & drop'}
                </h3>
                <p style={{ color: 'var(--slate-500)', fontSize: '0.85rem' }}>
                    Standard Equipment CSV (Max 10MB)
                </p>
                <input 
                    ref={fileInputRef}
                    type="file" 
                    accept=".csv" 
                    onChange={(e) => handleFileSelect(e.target.files[0])} 
                    style={{ display: 'none' }}
                />
            </div>

            {selectedFile && (
                <div style={{ 
                    padding: '24px', 
                    borderTop: '1px solid var(--slate-200)', 
                    backgroundColor: 'var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        <span style={{ fontSize: '1.25rem' }}>📄</span>
                        <div style={{ minWidth: 0 }}>
                            <p style={{ margin: 0, fontWeight: 500, color: 'var(--slate-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {selectedFile.name}
                            </p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                                {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleUpload();
                        }}
                        disabled={loading}
                        style={{
                            backgroundColor: 'var(--primary-600)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: loading ? 0.7 : 1,
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        {loading ? 'Analyzing...' : 'Analyze Data'}
                        {!loading && <span>→</span>}
                    </button>
                </div>
            )}

            {error && (
                <div style={{ 
                    margin: '0 20px 20px 20px', 
                    padding: '12px', 
                    backgroundColor: '#fef2f2', 
                    color: 'var(--error)',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}
        </div>
    );
});

export default FileUpload;
