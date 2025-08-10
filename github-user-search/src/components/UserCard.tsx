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
    <div className="user-card">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="user-avatar" />
      <div className="user-info">
        <h2>{user.name || user.login}</h2>
        <p className="username">@{user.login}</p>
        {user.location && <p className="location">📍 {user.location}</p>}
        {user.bio && <p className="bio">{user.bio}</p>}
        <div className="stats">
          <span>👥 {user.followers} followers</span>
          <span>👤 {user.following} following</span>
          <span>📁 {user.public_repos} repos</span>
        </div>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default UserCard;
