import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeDataWithNoir } from './noirIntegration';

export default function NoirContractUI() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!url) {
      setError('Please enter a URL to a dataset');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // This is where we'd call the actual Noir contract
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        // Simulate successful verification
        const mockResponse = {
          success: true,
          verificationResult: {
            verified: true,
            timestamp: new Date().toISOString(),
            datasetHash: '0x' + Math.random().toString(16).slice(2, 10) + '...',
          }
        };
        
        setResult(mockResponse);
        setLoading(false);
      }, 2000);
      
      // Uncomment the below line when you have actual Noir integration
      // const analysisResult = await analyzeDataWithNoir(url);
      // setResult(analysisResult);
    } catch (err) {
      setError('Failed to analyse dataset: ' + (err.message || 'Unknown error'));
      setLoading(false);
    }
  };

  const clearAll = () => {
    setUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Noir Contract Verification</h1>
      
      <div style={styles.inputGroup}>
        <label htmlFor="dataset-url" style={styles.label}>
          Dataset URL
        </label>
        <input
          id="dataset-url"
          type="text"
          style={styles.input}
          placeholder="https://example.com/dataset.json"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <div style={styles.buttonGroup}>
        <button
          style={{
            ...styles.primaryButton,
            opacity: loading || !url ? 0.5 : 1,
            cursor: loading || !url ? 'not-allowed' : 'pointer'
          }}
          onClick={handleAnalyze}
          disabled={loading || !url}
        >
          {loading ? (
            <span style={styles.loadingText}>
              <Loader2 style={{ marginRight: 8, animation: 'spin 1s linear infinite' }} size={16} />
              Analysing...
            </span>
          ) : (
            'Analyse with Noir'
          )}
        </button>
        
        <button
          style={styles.secondaryButton}
          onClick={clearAll}
          disabled={loading}
        >
          <X size={16} />
        </button>
      </div>

      {error && (
        <div style={styles.errorContainer}>
          <div style={styles.errorMessage}>
            <AlertCircle size={20} style={{ marginRight: 8, flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {result && (
        <div style={styles.resultContainer}>
          <h3 style={styles.resultHeading}>
            {result.success && result.verificationResult.verified ? (
              <div style={styles.flexRow}>
                <CheckCircle size={20} color="green" style={{ marginRight: 8 }} />
                <span style={{ color: 'green' }}>Verification Successful</span>
              </div>
            ) : (
              <div style={styles.flexRow}>
                <AlertCircle size={20} color="red" style={{ marginRight: 8 }} />
                <span style={{ color: 'red' }}>Verification Failed</span>
              </div>
            )}
          </h3>
          
          <div style={styles.resultDetails}>
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Timestamp:</span>
              <span style={styles.resultValue}>{result.verificationResult.timestamp}</span>
            </div>
            
            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Dataset Hash:</span>
              <span style={styles.resultValue}>{result.verificationResult.datasetHash}</span>
            </div>
          </div>
        </div>
      )}
      
      <div style={styles.footer}>
        <p>This UI connects to Noir zero-knowledge proof circuits for private data verification.</p>
      </div>
    </div>
  );
}

// Inline styles (alternative to Tailwind)
const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#1f2937',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontWeight: '500',
    fontSize: '14px',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '16px',
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    color: '#b91c1c',
    fontSize: '14px',
  },
  resultContainer: {
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '16px',
  },
  resultHeading: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '8px',
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center',
  },
  resultDetails: {
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    padding: '12px',
    marginTop: '8px',
  },
  resultRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '8px',
    fontSize: '14px',
    marginBottom: '4px',
  },
  resultLabel: {
    color: '#6b7280',
  },
  resultValue: {
    fontFamily: 'monospace',
  },
  footer: {
    marginTop: '24px',
    fontSize: '12px',
    color: '#6b7280',
  },
};