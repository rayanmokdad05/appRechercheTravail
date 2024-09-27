import React, { useState } from "react";

export default function OffresEntreprise({ setOffres }) {
  const [title, setTitle] = useState("");
  const [numero, setNumero] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOffre = {
      numero,
      title,
      description,
    };

    try {
      const response = await fetch("/api/travail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffre),
      });

      if (!response.ok) {
        throw new Error("Failed to create new offer");
      }

      const data = await response.json();
      setOffres((prevOffres) => [...prevOffres, data]); // Add the new offer to the list
      setTitle("");
      setNumero("");
      setDescription("");
    } catch (error) {
      console.error("Error creating new offer:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Créer une offre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numero">Numéro</label>
          <input
            type="text"
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
