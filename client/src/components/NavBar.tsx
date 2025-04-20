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
      name: "catalogue",
      path: "/catalogue",
      role: ["utilisateur", "administrateur"],
    },
  ];

  const [burger, setBurger] = useState(false);
  const handleShowNav = () => {
    setBurger(!burger);
  };

  return (
    <nav>
      <img src="/Logo_OriginalDigital.webp" alt="logo" />
      <div className={`navbar ${burger ? "show-nav" : "hide-nav"}`}>
        <ul className="navbar-links">
          {links
            .filter((link) => link.role.includes(role))
            .map((link) => (
              <li key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
        </ul>

        <button type="button" className="navbar-burger" onClick={handleShowNav}>
          <span className="burger-bar" />
        </button>
      </div>{" "}
      {role === "anonymous" ? (
        <Link className="seConnecter" to="/login">
          Se connecter
        </Link>
      ) : (
        <button className="connexion" type="button" onClick={disconnect}>
          Se déconnecter
        </button>
      )}
    </nav>
  );
}
