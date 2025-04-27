import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useState } from "react";
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
      name: "Original Digital",
      path: "/",
      role: ["anonymous", "utilisateur", "administrateur"],
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      role: ["administrateur"],
    },
    {
      name: "Catalogue",
      path: "/catalogue",
      role: ["utilisateur", "administrateur"],
    },
  ];
  const [open, setOpen] = useState(false);
  const handleBurger = () => {
    setOpen(!open);
  };

  return (
    <nav className={`navbar ${open ? "show-nav" : "hide-nav"}`}>
      <img src="/Logo_OriginalDigital.webp" alt="logo" />
      <div>
        <ul className="navbar-links">
          {links
            .filter((link) => link.role.includes(role))
            .map((link) => (
              <li key={link.name}>
                <Link to={link.path} onClick={handleBurger}>
                  {link.name}
                </Link>
              </li>
            ))}
          <div className="role-burger">
            {" "}
            {role === "anonymous" ? (
              <Link className="seConnecter" to="/login" onClick={handleBurger}>
                Se connecter
              </Link>
            ) : (
              <button className="connexion" type="button" onClick={disconnect}>
                Se déconnecter
              </button>
            )}
          </div>
        </ul>
      </div>
      <div className="role-nav">
        {role === "anonymous" ? (
          <Link className="seConnecter" to="/login">
            Se connecter
          </Link>
        ) : (
          <button className="connexion" type="button" onClick={disconnect}>
            Se déconnecter
          </button>
        )}
      </div>
      <button className="navbar-burger" type="button" onClick={handleBurger}>
        <span className="burger-bar" />
      </button>
    </nav>
  );
}
