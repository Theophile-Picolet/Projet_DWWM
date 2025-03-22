import "../styles/footer.css";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo_OriginalDigital.webp";

export default function Footer() {
  return (
    <footer>
      <img src={Logo} alt="Original Digital" />
      <div className="nav-footer">
        <div>
          <h3>Support</h3>
          <ul>
            <li>
              <Link to={"#"}>À propos d'Original Digital</Link>
            </li>
            <li>
              <Link to={"#"}>Nous contacter</Link>
            </li>
            <li>
              <Link to={"#"}>FAQ</Link>
            </li>
            <li>
              <Link
                to="https://fast.com/fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Test de vitesse
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Règles et conditions</h3>
          <ul>
            <li>
              <Link to={"#"}>Conditions d'utilisation</Link>
            </li>
            <li>
              <Link to={"#"}>Politique de confidentialité</Link>
            </li>
            <li>
              <Link to={"#"}>Mentions Légales</Link>
            </li>
            <li>
              <Link to={"#"}>Gérer les cookies</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>© 2025 Original Digital by Wilders</div>
    </footer>
  );
}
