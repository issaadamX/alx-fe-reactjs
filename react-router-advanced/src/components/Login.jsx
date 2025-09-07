const Login = ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Login Page</h1>
      <p>Please log in to access protected routes.</p>
      <button onClick={() => setIsLoggedIn(true)}>Login</button>
    </div>
  );
};

export default Login;
