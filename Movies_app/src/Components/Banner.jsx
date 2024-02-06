import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Banner extends Component {
  render() {
    console.log(movies);
    let movie = movies.results[0];

    return (
      <>
        {movie == " " ? (
          <div class="spinner-grow mt-5" role="status">
            <span class="visually-hidden">Loading...</span>
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
