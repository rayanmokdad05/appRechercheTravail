import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Inscrire() {
  const [nom, setNom] = useState("");
  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState("Candidat");
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authSubmitHandler = async (event) => {
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
      nomEntreprise: typeUtilisateur === "Entreprise" ? nomEntreprise : undefined,
    };

    try {
      const response = await fetch("http://localhost:3000/api/utilisateur/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourrielChange = (event) => {
    const { value } = event.target;
    setCourriel(value);
    if (!value.includes("@")) {
      setEmailError("Le courriel doit contenir '@'");
    } else {
      setEmailError("");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content signup">
          <form onSubmit={authSubmitHandler} className="login">
            <h2>Page d'inscription</h2>
            <div className="control-row">
              <label htmlFor="Nom">Nom</label>
              <input
                type="text"
                id="Nom"
                name="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="control-row">
              <label htmlFor="courriel">Courriel</label>
              <input
                id="courriel"
                type="text"
                name="courriel"
                value={courriel}
                onChange={handleCourrielChange}
                required
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="control-row">
              <label htmlFor="Password">Mot de passe</label>
              <input
                id="Password"
                type="password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="control-row">
              <label>Type d'utilisateur</label>
              <div className="control">
                <input
                  type="radio"
                  id="Candidat"
                  name="typeUtilisateur"
                  value="Candidat"
                  checked={typeUtilisateur === "Candidat"}
                  onChange={(e) => setTypeUtilisateur(e.target.value)}
                />
                <label htmlFor="Candidat">Candidat</label>
              </div>
              <div className="control">
                <input
                  type="radio"
                  id="Entreprise"
                  name="typeUtilisateur"
                  value="Entreprise"
                  checked={typeUtilisateur === "Entreprise"}
                  onChange={(e) => setTypeUtilisateur(e.target.value)}
                />
                <label htmlFor="Entreprise">Entreprise</label>
              </div>
            </div>
            {typeUtilisateur === "Entreprise" && (
              <div className="control-row">
                <label htmlFor="NomEntreprise">Nom de l'Entreprise</label>
                <input
                  type="text"
                  id="NomEntreprise"
                  name="NomEntreprise"
                  value={nomEntreprise}
                  onChange={(e) => setNomEntreprise(e.target.value)}
                  required
                />
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="button login__submit">
                Inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}