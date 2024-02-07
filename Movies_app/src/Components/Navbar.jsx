import React, { Component } from "react";
import { Link } from "react-router-dom"

export default class Navbar extends Component {
  render() {
    return (
      <div className="header" style={{ textAlign: "center", margin: "2rem", color: "whitesmoke" }}>
        <Link to="/" style={{ textDecoration: 'none', color: "whitesmoke" }}>
          <h1>Movie's villa</h1>
        </Link>
        <Link to="/favourites" style={{ textDecoration: 'none', color: "whitesmoke" }}>
          <h4 style={{ marginTop: "1rem" }}>Favourites</h4>
        </Link>
      </div>
    );
  }
}
