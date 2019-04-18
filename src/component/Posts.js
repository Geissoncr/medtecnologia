import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default ({ posts }) => (
  <Fragment>
    <ul>
      {Object.entries(posts).map(([slug, post]) => (
        <li key={slug}>
        <img src="../content/OGADA" />
          <h2>
            <NavLink to={slug}>{post.title}</NavLink>
          </h2>
          <p>{post.summary}</p>
          <em>{post.date}</em>
        </li>
      ))}
    </ul>
  </Fragment>
);