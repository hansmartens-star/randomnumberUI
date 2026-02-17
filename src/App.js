import React, { useState } from 'react';
import './App.css';

function App() {
  const [seed, setSeed] = useState('');
  const [randomValue, setRandomValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRandom = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRandomValue(null);

    try {
      const response = await fetch('/api/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ seed: parseInt(seed) || 0 })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setRandomValue(data.randomValue);
      } else {
        setError(data.error || 'Failed to generate random number');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Random Number Generator</h1>
      </header>

      <main>
        <form onSubmit={handleGenerateRandom}>
          <div className="form-group">
            <label htmlFor="seedInput">Seed Value:</label>
            <input
              id="seedInput"
              type="number"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder="Enter a seed value"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Random Number'}
          </button>
        </form>

        {error && (
          <div className="error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {randomValue !== null && (
          <div className="result">
            <h3>Result</h3>
            <div className="result-content">
              <p><strong>Seed:</strong> {seed}</p>
              <p><strong>Random Value:</strong> <span className="random-value">{randomValue}</span></p>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Random Number UI v1.0.0</p>
      </footer>
    </div>
  );
}

export default App;
