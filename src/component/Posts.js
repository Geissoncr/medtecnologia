import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
// import post1 from "../content/img/OGA5I60.jpg";
// import post2 from "../content/img/medico.jpg";

export default ({ posts }) => (
  <Fragment>
    <div>
      {Object.entries(posts).map(([slug, post]) => (
        <div key={slug}>
          <img src={post.image} className="App-image" alt={post.imageAlt} />
          <h2>
            <NavLink to={slug}>{post.title}</NavLink>
          </h2>
          <div style={{ whiteSpace: "pre-wrap" }}>{post.resumo}</div>
          <em>{post.date}</em>
        </div>
      ))}
    </div>
  </Fragment>
);