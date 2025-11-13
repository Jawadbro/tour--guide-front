import { useState } from "react";
import "./App.css"; // We'll create this next

export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `https://tour-guide-back.onrender.com/api/suggest-simple?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🇧🇩 BD Tour Guide</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a location or query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {result?.error && <div className="error">{result.error}</div>}

      {result?.success && (
        <div className="results">
          <div className="ai-message">
            <h2>Rahim Says:</h2>
            <p>{result.ai_message}</p>
          </div>

          <h2>Suggestions:</h2>
          <div className="cards">
            {result.suggestions.map((place, idx) => (
              <div key={idx} className="card">
                <h3>{place.name} ({place.division})</h3>
                {place.image && <img src={place.image} alt={place.name} />}
                <p>{place.description}</p>
                <a href={place.url} target="_blank" rel="noopener noreferrer">
                  More info
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
