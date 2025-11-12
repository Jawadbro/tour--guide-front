import { useState } from "react";

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
        `http://127.0.0.1:8000/api/suggest-simple?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>🇧🇩 BD Tour Guide</h1>

      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Enter a location or query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "0.5rem", marginLeft: "0.5rem" }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result?.error && <p style={{ color: "red" }}>{result.error}</p>}

      {result?.success && (
        <div>
          <h2>AI Message:</h2>
          <p>{result.ai_message}</p>

          <h2>Suggestions:</h2>
          <div>
            {result.suggestions.map((place, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "1rem",
                }}
              >
                <h3>
                  {place.name} ({place.division})
                </h3>
                {place.image && (
                  <img
                    src={place.image}
                    alt={place.name}
                    style={{ maxWidth: "300px", display: "block", margin: "0.5rem 0" }}
                  />
                )}
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
