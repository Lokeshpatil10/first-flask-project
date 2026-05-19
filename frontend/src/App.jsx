import { useState } from 'react';
import './index.css';

function App() {
  const [pincode, setPincode] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!pincode || !category) {
      setError('Please provide both pincode and category.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Fetch data from Flask backend
      const response = await fetch(`http://127.0.0.1:5000/search?pincode=${pincode}&category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Local Service Providers</h1>
        <p>Find the best local services in your area</p>
      </header>

      <main>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              type="text"
              placeholder="e.g. 400001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Construction Worker">Construction Worker</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="results-container">
          {results.length > 0 ? (
            <table className="results-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Pincode</th>
                  <th>Phone</th>
                  <th>Experience (Yrs)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.name}</td>
                    <td>{provider.category}</td>
                    <td>{provider.pincode}</td>
                    <td>{provider.phone}</td>
                    <td>{provider.experience_years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && !error && <p className="no-results">No results found. Please search for a category and pincode.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
