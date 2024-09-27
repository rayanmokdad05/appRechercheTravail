import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
/*import Login from "./components/Login/Login";
import Inscrire from "./Components/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Profile from "./Components/Profile/Profile";
import Offres from "./Components/Offres/Offre";
import OffresEntreprise from "./Components/Offres/OffreEntreprise";*/
import Login from "./components/login/Login";
import Inscrire from "./components/signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import Offres from "./components/Offres/Offre";
import OffresEntreprise from "./components/Offres/OffreEntreprise";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [offres, setOffres] = useState([]); // State pour les offres

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/signup" element={<Inscrire />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/offres"
            element={
              loggedInUser ? (
                <Offres
                  offres={offres}
                  loggedInUser={loggedInUser}
                  setOffres={setOffres}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/offresEntreprise"
            element={
              loggedInUser && loggedInUser.type === "Entreprise" ? (
                <OffresEntreprise setOffres={setOffres} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile/:userId"
            element={<Profile user={loggedInUser} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
