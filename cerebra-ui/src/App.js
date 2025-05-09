import { useState } from 'react';
import { analyzeDataWithNoir } from './noirHelpers';
import './NoirContractUI.css';

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

      const response = await analyzeDataWithNoir(url);

      if (response.success) {
        setResult(response.verificationResult);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Error analyzing dataset: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="container">
      <h1 className="title">Noir Contract Verification</h1>

      <div className="input-group">
        <label htmlFor="dataset-url">Dataset URL</label>
        <input
          id="dataset-url"
          type="text"
          className="input"
          placeholder="https://example.com/dataset.json"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="button-group">
        <button
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={loading || !url}
        >
          {loading ? 'Analyzing...' : 'Analyze with Noir'}
        </button>
        <button className="clear-button" onClick={clearAll} disabled={loading}>
          Clear
        </button>
      </div>

      {error && (
        <div className="error">
          <span>Error: {error}</span>
        </div>
      )}

      {result && (
        <div className="result">
          <h3 className="result-title">Verification Result</h3>
          <p>Verified: {result.verified ? 'Yes' : 'No'}</p>
          <p>Timestamp: {result.timestamp}</p>
          <p>Dataset Hash: {result.datasetHash}</p>
        </div>
      )}

      <div className="footer">
        This UI connects to Noir zero-knowledge proof circuits for private data
        verification.
      </div>
    </div>
  );
}
