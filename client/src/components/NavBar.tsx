import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useAuth } from "../services/AuthContext";

export default function NavBar() {
  const API = import.meta.env.VITE_API_URL;
  const { role, setRole } = useAuth();
  const navigate = useNavigate();
  const disconnect = () => {
    axios
      .get(`${API}/api/logout`, { withCredentials: true })
      .then(() => {
        setRole("anonymous");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const links = [
    {
      name: "Accueil",
      path: "/",
      role: ["anonymous", "administrateur"],
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      role: ["administrateur"],
    },
    {
      name: "Se connecter",
      path: "/login",
      role: ["anonymous"],
    },
    {
      name: "catalogue",
      path: "/catalogue",
      role: ["utilisateur", "administrateur"],
    },
  ];

  return (
    <nav>
      <img src="/Logo_OriginalDigital.webp" alt="logo" />
      <ul>
        {links
          .filter((link) => link.role.includes(role))
          .map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
      </ul>
      {role === "anonymous" ? (
        <Link to="/signup">Nous rejoindre</Link>
      ) : (
        <button type="button" onClick={disconnect}>
          Se déconnecter
        </button>
      )}
    </nav>
  );
}
