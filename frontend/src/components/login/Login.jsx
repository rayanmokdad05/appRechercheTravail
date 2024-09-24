import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { USERS } from "../../data/utilisateurs";

export default function Connexion({ onLogin }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const authSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredEmail.includes("@")) {
      setEmailError("Le courriel doit contenir '@'");
      return;
    }
    setEmailError("");

    const user = USERS.find(
      (user) =>
        user.email === enteredEmail && user.mot_de_passe === enteredPassword
    );

    if (user) {
      onLogin(user);
      navigate("/offres");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="container">
      <form onSubmit={authSubmitHandler} className="login">
        <h2>Connexion</h2>
        <div className="control-row">
          <label htmlFor="couriel">Courriel</label>
          <input
            id="couriel"
            type="text"
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="control-row">
          <label htmlFor="MotDePasse">Mot de passe</label>
          <input
            id="MotDePasse"
            type="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
