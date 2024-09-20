import { useState, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [entredValues, setEntredValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (identifier, value) => {
    setEntredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value, // on ajout [] pour acceder a la valeur de la propriete stored in a variable (js syntaxe)
    }));
  };
  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(entredValues);
    setEntredValues({
      email: "",
      password: "",
    });
  };
  return (
    <form onSubmit={authSubmitHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={entredValues.email}
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={entredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <Link to="/subscribe">
          <button className="button button-flat">Sign up</button>
        </Link>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
