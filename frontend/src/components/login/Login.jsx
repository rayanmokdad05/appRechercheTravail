import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Connexion({ onLogin }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (!enteredEmail.includes("@")) {
      setEmailError("Le courriel doit contenir '@'");
      return;
    }
    setEmailError("");

    try {
      const response = await fetch("api/utilisateur/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la connexion");
      }

      // Appeler la fonction onLogin avec les données de l'utilisateur
      onLogin(data.utilisateur, data.token);

      // Rediriger l'utilisateur vers une autre page après la connexion
      navigate("/dashboard");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={authSubmitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </div>
        {loginError && <p className="error">{loginError}</p>}
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}
