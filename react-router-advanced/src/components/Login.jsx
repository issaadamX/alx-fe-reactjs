import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();

  return (
    <div>
      <h1>Login Page</h1>
      <p>Please log in to access protected routes.</p>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
