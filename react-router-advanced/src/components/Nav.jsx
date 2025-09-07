import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/blog/1">Blog Post 1</Link> | 
      <Link to="/blog/2">Blog Post 2</Link> | 
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link> | 
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Nav;
