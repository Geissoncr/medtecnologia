import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

export default ({ date, title, summary, image, imageAlt }) => (

  <Fragment >
    <Helmet>
      <meta charSet="utf-8" />
      <title>MedTecnologia | {title}</title>
      <meta name="description" content={title} />
      <link rel="canonical" href="http://medtecnologia.com.br/" />
    </Helmet>
    <div style={{ padding: "10px", background: "#ffff", marginBottom: "20px" }}>

      <img src={image} alt={imageAlt} className="App-image" />
      <h2>{title}</h2>
      <p style={{ whiteSpace: "pre-wrap" }} >{summary}</p>
      <em>{date}</em>
      <h5>
        <NavLink to="/">Voltar</NavLink>
      </h5>
    </div>
  </Fragment>
);