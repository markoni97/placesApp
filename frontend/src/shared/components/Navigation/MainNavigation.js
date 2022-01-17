import React, { useState } from "react";

import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import classes from "./MainNavigation.module.css";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  const openDrawerHandler = () => {
    setIsOpened(true);
  };

  const closeDrawerHandler = () => {
    setIsOpened(false);
  };

  return (
    <React.Fragment>
      {isOpened && <BackDrop onClick={closeDrawerHandler} />}
      <SideDrawer show={isOpened} onClick={closeDrawerHandler}>
        <nav className={classes["main-navigation__drawer-nav"]}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className={classes["main-navigation__menu-btn"]}
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes["main-navigation__title"]}>
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className={classes["main-navigation__header-nav"]}>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
