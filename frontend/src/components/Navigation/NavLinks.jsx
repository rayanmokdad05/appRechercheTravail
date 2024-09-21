import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/users">ALL JOBS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink to="/u1/tasks">MY JOBS</NavLink>
          </li>
          <li>
            <NavLink to="/tasks/new">ADD JOB</NavLink>
          </li>
        </>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
