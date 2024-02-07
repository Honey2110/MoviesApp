import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      genre: [],
      currgen: "All Genre",
      movie: [],
      currText: '',
      limit: 5,
      currPage: 1
    };
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("movie") || "[]");
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
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    temp.unshift("All Genre");
    this.setState({
      genre: [...temp],
      movie: [...data],
    });
  }

  handleGenre = (genre) => {
    this.setState({
      currgen: genre
    })
  }

  sortDescPopularity = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity
    })
    this.setState({
      movie: [...temp]
    })
  }

  sortAscPopularity = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity
    })
    this.setState({
      movie: [...temp]
    })
  }

  sortDescRating = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average
    })
    this.setState({
      movie: [...temp]
    })
  }

  sortAscRating = () => {
    let temp = this.state.movie;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average
    })
    this.setState({
      movie: [...temp]
    })
  }

  handlePage = (page) => {
    this.setState({
      currPage: page
    })
  }

  handleDelete = (id) => {
    let newArr = [];
    newArr = this.state.movie.filter((movieObj) => movieObj.id != id);
    this.setState({
      movie: [...newArr]
    })
    localStorage.setItem("movie", JSON.stringify(newArr))
  }

  render() {
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
    let filterarr = [];

    if (this.state.currText == "") {
      filterarr = this.state.movie
    } else {
      filterarr = this.state.movie.filter((movieObj) => {
        let title = movieObj.title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase());
      })
    }

    if (this.state.currgen !== "All Genre") {
      filterarr = this.state.movie.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen)
    }

    let pages = Math.ceil(filterarr.length / this.state.limit)
    let pagesarr = [];
    for (let i = 1; i < pages; i++) {
      pagesarr.push(i);
    }
    let startIndex = (this.state.currPage - 1) * this.state.limit;
    let endIndex = startIndex + this.state.limit;
    filterarr = filterarr.slice(startIndex, endIndex)
    return (
      <>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-sm-12 text-light ">
              <h6>Search for movie</h6>
              <div class="input-group mb-3">

                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Movie Name"
                  value={this.state.currText}
                  onChange={(e) => { { this.setState({ currText: e.target.value }) } }}
                />

                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Row Count"
                  value={this.state.limit}
                  onChange={(e) => this.setState({ limit: e.target.value })}
                />
              </div>
              <table class="table table-hover text-light ">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fa-solid fa-caret-up fa-2xs" onClick={this.sortDescPopularity} />  Popularity <i class="fa-solid fa-caret-down fa-2xs" onClick={this.sortAscPopularity} /></th>
                    <th scope="col"><i class="fa-solid fa-caret-up fa-2xs" onClick={this.sortDescRating} /> Rating <i class="fa-solid fa-caret-down fa-2xs" onClick={this.sortAscRating} /></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filterarr.map((movieObj) => (
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
                        <button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  {
                    pagesarr.map((page) => (
                      <li class="page-item">
                        <a class="page-link" onClick={() => this.handlePage(page)}>
                          {page}
                        </a>
                      </li>
                    ))
                  }

                </ul>
              </nav>
            </div>
            <div className="col-lg-4 col-sm-12">
              <ul class="list-group favourites-genres">
                {this.state.genre.map((genre) =>
                  this.state.currgen == genre ? (
                    <li
                      class="list-group-item"
                      style={{ background: 'black', color: 'white', fontWeight: 'bold' }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      class="list-group-item"
                      style={{ background: 'whitesmoke', color: '#3f51b5' }}
                      onClick={() => this.handleGenre(genre)}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
