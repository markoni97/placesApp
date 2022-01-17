import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

const NavLinks = () => {
  return (
    <ul className={classes['nav-links']}>
      <li>
        <NavLink to="/" exact  activeClassName={classes.active}>ALL USERS</NavLink>
      </li>
      <li>
        <NavLink to="/u1/places" activeClassName={classes.active}>MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new" activeClassName={classes.active}>ADD PLACE</NavLink>
      </li>
      <li>
        <NavLink to="/auth" activeClassName={classes.active}>AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
