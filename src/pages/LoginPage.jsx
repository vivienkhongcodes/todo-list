import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || '/todos';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoggingOn(true);
    setAuthError('');
    
    const result = await login(email, password);

    // useEffect will handle redirect
    if (!result.success) {
      setAuthError(result.error);
    }

    setIsLoggingOn(false);
  }
  
return (
  <form onSubmit={handleSubmit}>
    {authError && <p>{authError}</p>}

    <label htmlFor="email">Email</label>

    <input
      id="email"
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      required
    />  

    <label htmlFor="password">Password</label>

    <input
      id="password"
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      required
    />

    <button type="submit" disabled={isLoggingOn}>
      {isLoggingOn ? 'Logging in...' : 'Log On'}    
    </button>
  
  </form>  
  );
}  

export default LoginPage;
