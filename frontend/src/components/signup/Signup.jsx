import React, { useState } from "react";

const Signup = () => {
  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState("Utilisateur");
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!courriel.includes("@")) {
      setEmailError("Le courriel doit contenir '@'");
      return;
    }
    setEmailError("");
    setIsLoading(true);

    const newUser = {
      email: courriel,
      password: password,
      nom: nom,
      type: typeUtilisateur,
      nomEntreprise:
        typeUtilisateur === "Entreprise" ? nomEntreprise : undefined,
    };

    try {
      const response = await fetch("/api/utilisateur/signup", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Handle successful signup (e.g., redirect to login page or show success message)
      console.log("User signed up successfully:", data);
      setIsLoading(false);
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Courriel:</label>
        <input
          type="email"
          value={courriel}
          onChange={(e) => setCourriel(e.target.value)}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>
      <div>
        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div>
        <label>Type d'utilisateur:</label>
        <select
          value={typeUtilisateur}
          onChange={(e) => setTypeUtilisateur(e.target.value)}
        >
          <option value="Utilisateur">Utilisateur</option>
          <option value="Entreprise">Entreprise</option>
        </select>
      </div>
      {typeUtilisateur === "Entreprise" && (
        <div>
          <label>Nom de l'entreprise:</label>
          <input
            type="text"
            value={nomEntreprise}
            onChange={(e) => setNomEntreprise(e.target.value)}
          />
        </div>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Chargement..." : "S'inscrire"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Signup;
