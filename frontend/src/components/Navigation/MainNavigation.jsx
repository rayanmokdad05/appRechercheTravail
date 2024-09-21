import { Link } from "react-router-dom";
import { useState } from "react";

import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <>
      <header className="main-header">
        <h1 className="main-navigation__title">
          <Link to="/">Indeed version nulle</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
