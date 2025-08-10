import React, { useState } from 'react';
import { searchUsers } from '../services/githubApi';
import UserCard from './UserCard';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsers = async (pageNumber = 1) => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = {
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos.trim(),
        page: pageNumber,
      };
      const data = await searchUsers(queryParams);
      if (pageNumber === 1) {
        setUsers(data.items);
      } else {
        setUsers((prev) => [...prev, ...data.items]);
      }
      setTotalCount(data.total_count);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const loadMore = () => {
    fetchUsers(page + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          min="0"
          placeholder="Minimum Repositories (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-48 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {users.length > 0 && users.length < totalCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
