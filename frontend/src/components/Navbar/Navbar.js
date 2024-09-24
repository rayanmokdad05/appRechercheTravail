import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ loggedInUser, onLogout }) {
  return (
    <nav>
      <ul>
        {loggedInUser ? (
          <>
            <li>
              <Link to={`/profile/${loggedInUser.id_utilisateur}`}>
                Mon Profil
              </Link>
            </li>
            <li>
              <Link to="/offres">Tableau d'offres</Link>
            </li>
            {/* Afficher "Créer une offre" uniquement pour les utilisateurs de type "Entreprise" */}
            {loggedInUser.type === "Entreprise" && (
              <li>
                <Link to="/offresEntreprise">Créer une offre</Link>
              </li>
            )}
            {/* Lien de déconnexion */}
            <li>
              <Link to="/" onClick={onLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
