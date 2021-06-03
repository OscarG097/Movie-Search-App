// import styled from "styled-components";
import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      movie: [],
      favs: [],
      error: false,
    };
  };

  async componentDidMount() {
    try {
      const movie_id = Object.values(this.props.match.params);
      const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=756e1622851086c3d011b8461693b962&language=es-ES`;
      this.setState({ loading: true, error: false });
      const response = await fetch(url);
      const responseJson = await response.json();
      const movie = responseJson;
      this.setState({ movie, loading: false, error: false });
    } catch (e) {
      this.setState({ loading: false, error: true })
    }
  };

  // Guardar Favoritos
  saveFavs = (movie) => {
    let { favs } = this.state;
    const favorite = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      adult: movie.adult,
      overview: movie.overview,
      tagline: movie.tagline,
      vote_average: movie.vote_average
    }
    let allMovies = JSON.parse(localStorage.getItem('favs-movies')) || [];
    let repeated = allMovies.filter(function (movie) { return movie.id === favorite.id }).length;

    if (!repeated) {
      this.setState({ favs });
      allMovies.push(favorite);
      localStorage.setItem("favs-movies", JSON.stringify(allMovies));
      alert('Se agregó la pelicula a favoritos')
    } else {
      alert('La película ya está agregada')
    };
  }

  //Borrar Favoritos
  // daleteFavs = () => {
  //   let { boolFavorite } = this.setState;
  //   boolFavorite = false;
  // }


  render() {
    const { movie, loading, error } = this.state;

    const myStyle = {
      marginTop: '2.5em'
    }


    return (
      <div>
        <Navbar />
        <div className='container-flex' style={myStyle}>
        </div>
        <div className='col-12 anchor' >
          {!loading && !error && movie.id &&
            <div>
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 float-left p-2 my-2 text-center">
                <img className="poster" alt="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              </div>
              <div className="col-xs-12 col-sm-6 col-md-8 col-lg-9 col-xl-9 float-left p-8 my-4 text-left">
                <h2> {movie.title}</h2>
                <p>{movie.tagline}</p>
                <p>Nota del público: {movie.vote_average}</p>
                <p>ATP: {movie.adult ? '+18' : 'Apto para todo publico'}</p>
                <p>Resumen: {movie.overview}</p>
                <button onClick={() => this.saveFavs(movie)}> {this.boolFavorite ? 'Eliminar favorito' : 'Agregar favorito'} </button>
              </div>
            </div>
          }
          {loading &&
            <div class="col-12 text-center">
              <p>Cargando información...</p>
            </div>
          }
          {!loading && !error && !movie.id &&
            <div class="col-12 text-center">
              <h2>No hay información disponible.</h2>
            </div>
          }
          {!loading && error &&
            <div class="col-12 text-center">
              <h2>Ocurrió un error.</h2>
            </div>
          }
        </div>
      </div>
    )
  };
};
export default Detail;

// const Title = styled.h2`
// color: red
// `;

// const ButtonFav = styled.button`
//   width: 100%;
//   display: flex;
//   gap: 20px;

//   button {
//     cursor: pointer;
//     color: white;
//     padding: 10px;
//     font-weight: 600;
//     background-color: red;
//     border: none;
//     border-radius: 6px;
//     transition: all ease-out 0.3s;

//     &:hover {
//       filter: brightness(0.8);
//       transform: translateY(-4px);
//     }

//     &:first-child {
//       width: 70%;
//     }

//     &:last-child {
//       width: 30%;
//     }
//   }
// `;