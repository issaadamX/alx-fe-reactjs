import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

/**
 * Fetches user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} - User data from GitHub API
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

export default { fetchUserData };
