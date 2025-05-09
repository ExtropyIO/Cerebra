import React from 'react';
import './App.css';
import NoirContractUI from './components/NoirContractUI';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Noir Contract Integration</h1>
        <p>A simple UI to interact with zero-knowledge proofs</p>
      </header>
      <main style={{ padding: '20px' }}>
        <NoirContractUI />
      </main>
      <footer style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        <p>Built with React and Noir</p>
      </footer>
    </div>
  );
}

export default App;