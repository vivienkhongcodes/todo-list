import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>    
      <p>The page you are looking for does not exist.</p>
      <p><Link to="/">Home</Link></p>
      <p><Link to="/todos">Todos</Link></p>
      <p><Link to="/about">About</Link></p>
    </div>
  );
}

export default NotFoundPage;