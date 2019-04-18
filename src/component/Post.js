import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default ({ date, title, summary }) => (
  <Fragment>
    <img src={`../content/medtecnologia-logo.svg`}/>
    <h2>{title}</h2>
    <p>{summary}</p>
    <em>{date}</em>
    <h5>
      <NavLink to="/">Voltar</NavLink>
    </h5>
  </Fragment>
);