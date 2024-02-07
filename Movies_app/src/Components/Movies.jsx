import React, { Component } from "react";
// import { movies } from "./getmovies";
import axios from "axios"

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      fav: []
    };
  }
  async componentDidMount() {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    let data = res.data
    // console.log(data);
    this.setState({
      movies: [...data.results]
    })
  }

  changeMovies = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    let data = res.data
    // console.log(data);
    this.setState({
      movies: [...data.results]
    })
  }

  handleNext = () => {
    let temparr = []
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temparr.push(i);
    }
    this.setState({
      parr: [...temparr],
      currPage: this.state.currPage + 1
    }, this.changeMovies)
  }

  handlePrevious = () => {
    if (this.state.currPage != 1) {
      this.setState({
        currPage: this.state.currPage - 1
      }, this.changeMovies)
    }
  }

  handleClick = (value) => {
    if (this.state.currPage != value) {
      this.setState({
        currPage: value,
      }, this.changeMovies)
    }
  }

  handleFav = (movie) => {
    let olddata = JSON.parse(localStorage.getItem("movie") || "[]");
    if (this.state.fav.includes(movie.id)) {
      olddata = olddata.filter((m) => m.id !== movie.id)
    } else {
      olddata.push(movie)
    }
    localStorage.setItem("movie", JSON.stringify(olddata));
    // console.log(olddata);
    this.handleFavState();
  }
  handleFavState = () => {
    let olddata = JSON.parse(localStorage.getItem("movie") || "[]");
    let temp = olddata.map((m) => m.id);
    this.setState({
      fav: [...temp]
    })
  }

  render() {
    // console.log("render");
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div class="p-5 d-flex flex-column justify-content-center align-items-center">
            <div class="spinner-border text-light" role="status">
            </div>
            <div class="small pt-2 text-light">Loading…</div>
          </div>
        ) : (
          <div>
            <h3 className="text-center" style={{ textAlign: "center", margin: "2rem", color: "whitesmoke" }}>
              <strong>Trendings</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
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
                      // justifyContent: "center",
                      width: "100%"
                    }}
                  >
                    {this.state.hover == movieObj.id && (
                      <a className="btn bg-dark text-white movies-button" onClick={() => this.handleFav(movieObj)}>
                        {this.state.fav.includes(movieObj.id) ? "Remove from Fav" : "Add to Fav"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={this.handlePrevious}
                  >
                    Previous
                  </a>
                </li>
                {this.state.parr.map((value) => (
                  <li className="page-item">
                    <a className="page-link" onClick={() => this.handleClick(value)} >
                      {value}
                    </a>
                  </li>
                ))}

                <li className="page-item">
                  <a className="page-link" onClick={this.handleNext}>
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
