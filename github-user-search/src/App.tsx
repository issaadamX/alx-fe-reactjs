import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import ErrorMessage from './components/ErrorMessage';
import { getUserDetails } from './services/githubApi';
import './App.css';

interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const userData = await getUserDetails(username);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and view their profiles</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {error && <ErrorMessage message={error} />}
        
        {loading && <div className="loading">Searching for user...</div>}
        
        {user && <UserCard user={user} />}
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
