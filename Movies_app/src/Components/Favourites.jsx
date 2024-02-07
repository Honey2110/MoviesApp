import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      genre: [],
      currgen: "All Genre",
    };
  }
  render() {
    const movie = movies.results;
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let temp = [];
    movie.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    
    temp.unshift("All Genre");
    // console.log(temp);
    return (
      <>
        <div class="container">
          <div class="row">
            <div className="col-lg-3 col-sm-12">
              <ul class="list-group favourites-genres">
                {temp.map((genre) =>
                  this.state.currgen == genre ? (
                    <li
                      class="list-group-item"
                      style={{
                        background: "#3f51b5",
                        color: "white",
                        fontWeight: 400,
                      }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      class="list-group-item"
                      style={{
                        background: "#white",
                        color: "black",
                        fontWeight: 400,
                      }}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div class="col-8 text-light">
              <h6>Search for movie</h6>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Movie Name"
                />
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Row Number"
                />
              </div>
              <table class="table table-hover text-light ">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Popularity</th>
                    <th scope="col">Rating</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {movie.map((movieObj) => (
                    <tr>
                      <td>{movieObj.title}</td>
                      <td className="w-25">
                        <img
                          src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                          alt={movieObj.title}
                          className="img-thumbnail"
                        />
                      </td>
                      <td>{genreids[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <th>{movieObj.vote_average}</th>
                      <th>
                        <button type="button" class="btn btn-danger">
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
