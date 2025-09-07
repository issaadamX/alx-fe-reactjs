import { Outlet, Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <Link to="/profile/details">Details</Link> | <Link to="/profile/settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Profile;
