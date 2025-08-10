import React from 'react';

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

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="flex border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-24 h-24 rounded-full mr-4" />
      <div className="flex flex-col flex-1">
        <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
        <p className="text-gray-600">@{user.login}</p>
        {user.location && <p className="text-gray-500 mt-1">📍 {user.location}</p>}
        {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
        <div className="flex space-x-4 mt-3 text-sm text-gray-600">
          <span>👥 {user.followers} followers</span>
          <span>👤 {user.following} following</span>
          <span>📁 {user.public_repos} repos</span>
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default UserCard;
