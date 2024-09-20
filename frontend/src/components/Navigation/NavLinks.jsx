import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/users">ALL USERS</NavLink>
      </li>

      <li>
        <NavLink to="/u1/tasks">MY TASKS</NavLink>
      </li>
      <li>
        <NavLink to="/tasks/new">ADD TASK</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
