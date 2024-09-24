import React, { useState } from "react";

export default function OffresEntreprise({ setOffres }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOffre = {
      id: Date.now(), // Utiliser un ID unique
      title,
      description,
    };
    setOffres((prevOffres) => [...prevOffres, newOffre]); // Ajoute l'offre à la liste
    setTitle("");
    setDescription("");
  };

  return (
    <div className="container">
      <h1>Créer une offre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter Offre</button>
      </form>
    </div>
  );
}
