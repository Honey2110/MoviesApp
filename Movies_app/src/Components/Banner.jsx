import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Banner extends Component {
  render() {
    let movie = movies.results[3];

    return (
      <>
        {movie == " " ? (
          <div class="p-5 d-flex flex-column justify-content-center align-items-center">
          <div class="spinner-border text-light" role="status">
          </div>
          <div class="small pt-2 text-light">Loading…</div>
        </div>
        ) : (
          <div className="card banner-card">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="card-img-top banner-img"
            />
            <h1 className="card-title banner-title">{movie.title}</h1>
            <p className="card-text banner-text">{movie.overview}</p>
          </div>
        )}
      </>
    );
  }
}
