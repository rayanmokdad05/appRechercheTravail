import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Offres({ offres, loggedInUser, setOffres }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    const fetchOffres = async () => {
      try {
        const response = await fetch("/api/travail", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser.token}`, // Assuming you have a token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch offres");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Debugging: Log fetched data
        setOffres(data);
      } catch (error) {
        console.error("Error fetching offres:", error.message); // Debugging: Log error
      }
    };

    fetchOffres();
  }, [loggedInUser, navigate, setOffres]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/travail/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`, // Assuming you have a token for authentication
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete offre");
      }

      // Supprime l'offre avec l'ID correspondant de l'état local
      setOffres(offres.filter((offre) => offre._id !== id));
    } catch (error) {
      console.error("Error deleting offre:", error.message); // Debugging: Log error
    }
  };

  if (!loggedInUser) {
    navigate("/login");
    return null;
  }

  console.log("Logged in user:", loggedInUser); // Debuggg: Log loggedInUser
  console.log("User type:", loggedInUser.userType); // Debugging: Log userType

  return (
    <div>
      <h1>Liste des Offres</h1>
      {offres.length > 0 ? (
        <ul>
          {offres.map((offre) => (
            <li key={offre._id}>
              <h2>{offre.title}</h2>
              <p>Numéro: {offre.numero}</p>
              <p>{offre.description}</p>
              {loggedInUser.userType === "Entreprise" && (
                <button onClick={() => handleDelete(offre._id)}>
                  Supprimer
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune offre disponible.</p>
      )}
    </div>
  );
}
