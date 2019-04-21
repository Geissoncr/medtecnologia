import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default ({ date, title, summary,image,  imageAlt }) => (
  <Fragment>
    <img src={image} alt={imageAlt} className = "App-image"/>
    <h2>{title}</h2>
    <p style={{whiteSpace: "pre-wrap"}} >{summary}</p>
    <em>{date}</em>
    <h5>
      <NavLink to="/">Voltar</NavLink>
    </h5>
  </Fragment>
);