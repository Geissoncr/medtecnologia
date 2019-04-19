import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import post1 from "../content/img/OGA5I60.jpg"

export default ({ posts }) => (
    <Fragment>
    <div>
      {Object.entries(posts).map(([slug, post]) => (
        <div key={slug}>
        <img src={post1} className="App-logo" alt={post.imageAlt} />
          <h2>
            <NavLink to={slug}>{post.title}</NavLink>
          </h2>
          <p>{post.summary}</p>
          <em>{post.date}</em>
        </div>
      ))}
    </div>
  </Fragment>
  );