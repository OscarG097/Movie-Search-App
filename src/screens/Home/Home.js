import React, { Component } from 'react';
import './styles.css';
import Favs from '../../components/Favs/Favs';
import Navbar from '../../components/Navbar/Navbar';
import MovieRow from '../../components/MovieRow';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      moviesF: [],
      moviesH:  [],
      premiere: [],
      trending: [],
      error: false,
    };
  };

  //Primeras películas
  homeMovies(genres) {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=756e1622851086c3d011b8461693b962&language=es-ES';
    if (genres) {
      url += '&with_genres=' + genres;
    }
    return fetch(url);
  }

  // Peliculas Estreno
  fetchPremiere() {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=756e1622851086c3d011b8461693b962&language=es-ES&primary_release_year=2021';
    return fetch(url);
  }

  // Películas en tendencias
  fetchTrending() {
    let url = 'https://api.themoviedb.org/3/discover/movie?api_key=756e1622851086c3d011b8461693b962&language=es-ES&sort_by=popularity.desc';
    return fetch(url);
  }

  async componentDidMount(genres) {
    try {
      this.homeMovies(genres)
        .then(response => response.json())
        .then(json => this.setState({ moviesH: json.results.slice(0, 18)}))
      
// --> Se comenta para observar el mensaje de error <-- \\

      this.fetchTrending(genres)
        .then(response => response.json())
        .then(json => this.setState({ trending: json.results.slice(0, 12)}))
      this.setState({loading: false, error: false});
    } catch(e) {
      this.setState({ loading: false, error: true })
    }
  }

  changeGenre(genres) {
    this.componentDidMount(genres);
  }

  render() {
    const { premiere, moviesH, trending, loading, error } = this.state;
    const myStyle ={
      marginTop: '2.5em'
    }
    return (
      <div>
        <div className="Home" style={myStyle}>
        <div className='container-flex'>
          <Navbar />
          <div className='col-12 anchor' id='moviesH'>
                <h1>Películas</h1>
                <div className='row'>
                    {!loading && moviesH.map(movie =><MovieRow movie ={movie} key={movie.id}/> )}
                    {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div> }
                    {!loading && !error && !moviesH.length &&  <div className='col-12 text-center'><h3>No hay información disponible.</h3> </div> }
                    {!loading && error &&  <div className='col-12 text-center'> <h2>Ocurrió un error.</h2> </div>}
                </div>
            </div>
          <div className='col-12 anchor' id='premiere'>
                <h1>Estrenos</h1>
                <div className='row'>
                  <div className='col-12 text-left'>
                  </div>
                      {!loading && premiere.map(movie => <MovieRow movie ={movie} key={movie.id}/>)}
                      {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div> }
                      {!loading && !error && !premiere.length && <div className='col-12 text-center'> <h2>No hay información disponible.</h2></div> }
                      {!loading && error && <div className='col-12 text-center'> <h2>Ocurrió un error.</h2></div> }
                </div>
              </div>
            <div className='col-12 anchor' id='trend'>
                <h1>Películas más populares</h1>
                <div className='row'>
                    {!loading && trending.map(movie =><MovieRow movie ={movie} key={movie.id}/> )}
                    {loading && <div className='col-12 text-center'> <p>Cargando información...</p> </div> }
                    {!loading && !error && !trending.length &&  <div className='col-12 text-center'><h2>No hay información disponible.</h2> </div> }
                    {!loading && error &&  <div className='col-12 text-center'> <h2>Ocurrió un error.</h2> </div>}
                </div>
            </div>
          <Favs />
          </div>
        </div>
      </div>
    );
  }
};
export default Home;

