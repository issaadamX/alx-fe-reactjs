import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

const githubApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
  },
});

export const searchUsers = async (params: { username: string; location?: string; minRepos?: string; page?: number }) => {
  try {
    let query = params.username;
    if (params.location) {
      query += `+location:${params.location}`;
    }
    if (params.minRepos) {
      query += `+repos:>=${params.minRepos}`;
    }
    const page = params.page || 1;
    const response = await githubApi.get(`/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=30`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const getUserDetails = async (username: string) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw error;
  }
};

export default githubApi;
