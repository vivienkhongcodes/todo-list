import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

function Logoff() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogoff() {
    const result = await logout();

    if (!result.success) {
      console.error(result.error);
    } else {
      navigate("/login");
    }  
  }

  return (
    <button type="button" onClick={handleLogoff}>
      Log off    
    </button>
  );
}

export default Logoff;