import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.api-ninjas.com/v1/celebrity?name=${searchTerm}`,
          {
            headers: {
              'X-Api-Key': 'YOUR API KEY'
            }
          }
        );
        const data = await res.json();
        setSearchResults(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    if (searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm])

  return (
    <div>
    <h1>Title Goes Here</h1>
      <form>
        <label htmlFor="search">Search for a Nepo Baby:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </form>
      {error && <div>{error.message}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        searchResults.map(result => (
          <div key={result.id}>
            <h2>{result.name}</h2>
            <p>{result.max_height}</p>
            <p>Nepo Baby Net worth from 2023: {result.net_worth}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
