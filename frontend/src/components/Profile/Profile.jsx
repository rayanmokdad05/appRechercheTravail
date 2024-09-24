import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location]);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="screen__content">
        <h1 style={{ marginBottom: "25px", fontSize: "65x" }}>🏡 BIENVENUE!</h1>
        <div className="profile">
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
            alt="Profile Avatar"
            className="profile-avatar"
            style={{ width: "420px", height: "300px" }}
          />

          <div className="profile-info">
            <div className="profile-name">
              <h2>{user.nom}</h2>
            </div>
            <div className="profile-email">
              <p>Courriel: {user.email}</p>
            </div>
          </div>

          <div className="profile-buttons">
            <Link to={`/profile/${user?.id_utilisateur}/Travail`}>
              <button className="profile-button">Trouver un travail</button>
            </Link>
            <Link to={`/ModifierProfil`}>
              <button className="profile-button">Modifier le profil</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
