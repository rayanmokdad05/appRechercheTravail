import React from "react";
import { useNavigate } from "react-router-dom";

export default function Offres({ offres, loggedInUser, setOffres }) {
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate("/login");
    return null;
  }

  const handleDelete = (id) => {
    // Supprime l'offre avec l'ID correspondant
    setOffres(offres.filter((offre) => offre.id !== id));
  };

  return (
    <div>
      <h1>Liste des Offres</h1>
      <ul>
        {offres.length > 0 ? (
          offres.map((offre) => (
            <li key={offre.id}>
              <h2>{offre.title}</h2>
              <p>{offre.description}</p>
              <button onClick={() => handleDelete(offre.id)}>Supprimer</button>
            </li>
          ))
        ) : (
          <p>Aucune offre disponible.</p>
        )}
      </ul>
    </div>
  );
}
