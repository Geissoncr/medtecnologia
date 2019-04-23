import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import './Posts.css';

// import post1 from "../content/img/OGA5I60.jpg";
// import post2 from "../content/img/medico.jpg";

export default ({ posts }) => (
  <Fragment>
    <div>
      {Object.entries(posts).map(([slug, post]) => (
        <div style={{padding:"10px", background: "#ffff", marginBottom: "20px"}} key={slug}>
          <img src={post.image} className="App-image" alt={post.imageAlt} />
          <h1 style={{fontSize: "30px", color:"#003d79", fontFamily:"Roboto-Regular"}}>{post.title}</h1>
          <p>{post.date}</p>
          <div style={{ whiteSpace: "pre-wrap" }}>{post.resumo}</div>
          <NavLink to={slug}>Continue Lendo...</NavLink>
        </div>
      ))}
    </div>
  </Fragment>
);