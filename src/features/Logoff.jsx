import { useAuth } from "../contexts/AuthContext";

function Logoff() {
  const { logout } = useAuth();

  async function handleLogoff() {
    const result = await logout();

    if (!result.success) {
      console.error(result.error);
    }
  }

  return (
    <button type="button" onClick={handleLogoff}>
      Log off    
    </button>
  );
}

export default Logoff;