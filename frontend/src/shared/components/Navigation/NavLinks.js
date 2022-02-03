import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import classes from "./NavLinks.module.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/" exact activeClassName={classes.active}>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLogedIn && (
        <li>
          <NavLink to="/u1/places" activeClassName={classes.active}>
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLogedIn && (
        <li>
          <NavLink to="/places/new" activeClassName={classes.active}>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!auth.isLogedIn && (
        <li>
          <NavLink to="/auth" activeClassName={classes.active}>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {auth.isLogedIn && <li><button onClick={auth.logout}>LOGOUT</button></li>}
    </ul>
  );
};

export default NavLinks;
