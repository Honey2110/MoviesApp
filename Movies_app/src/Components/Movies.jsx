import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
    };
  }
  render() {
    let movie = movies.results;
    return (
      <>
        {movie.length == 0 ? (
          <div class="spinner-grow mt-5" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trendings</strong>
            </h3>
            <div className="movies-list">
              {movie.map((movieObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    alt={movieObj.title}
                    className="card-img-top movies-img"
                  />
                  <h5 className="card-title movies-title">{movieObj.title}</h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover == movieObj.id && (
                      <a className="btn btn-primary movies-button">
                        Add to Favourite
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a
                    class="page-link"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Previous
                  </a>
                </li>
                {this.state.parr.map((value) => (
                  <li class="page-item">
                    <a class="page-link" href="#">
                      {value}
                    </a>
                  </li>
                ))}

                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </>
    );
  }
}
