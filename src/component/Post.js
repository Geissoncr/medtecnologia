import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

export default ({ date, title, summary, image, imageAlt, links }) => (

  <Fragment >
    <Helmet>
      <meta charSet="utf-8" />
      <title>MedTecnologia | {title}</title>
      <meta name="description" content={title} />
      <link rel="canonical" href="http://medtecnologia.com.br/" />
    </Helmet>
    <div style={{ padding: "10px", background: "#ffff", width: "52em", marginBottom: "20px" }}>

      <h2 style={{ color:"#003d79" }}>{title}</h2>
      <img src={image} alt={imageAlt} className="App-image" />
      <p style={{ whiteSpace: "pre-wrap", textAlign: "justify", color:"black" }} >{summary}</p>
      <em>{date}</em>
      <br/>
      {links? links.map((link)=> (
      <p style={{ color:"black" }}>Links de Referência:
      <br/>
      <br/>
        <a href={link}>{link}<br/></a>
      </p>
      )):<br/>}
      <h5>
        <NavLink to="/">Voltar</NavLink>
      </h5>
    </div>
  </Fragment>
);