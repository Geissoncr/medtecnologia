import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default ({ date, title }) => (
  <Fragment>
    <h1>
      <NavLink to="/">Blog</NavLink>
    </h1>
    <h2>{title}</h2>
    <em>{date}</em>
  </Fragment>
);