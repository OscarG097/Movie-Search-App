import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';


class Navbar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      moviesF: [],
      genres: [],
      error: false,
    };
  };

  fetchGenre() {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=756e1622851086c3d011b8461693b962&language=es-ES')
      .then(response => response.json())
      .then(json => this.setState({ genres: json.genres }));
  };

  async componentDidMount(genres) {
    try {
      this.fetchGenre(genres)
        .then(response => response.json())
        .then(json => this.setState({ premiere: json.results.slice(0, 12) }))
    } catch (e) {
      this.setState({ loading: false, error: true })
    }
  }

  // Calling genres
  componentWillMount() {
    this.fetchGenre();
  };
  // filter movies
  changeGenre(genres) {
    this.componentDidMount(genres);
  }


  render() {
    const { genres } = this.state;
    return (
      <nav className='navbar navbar-expand-lg navbar-expand-xl navbar-dark bg-danger fixed-top'>
        <div className='container'>
          <a className='navbar-brand' href='/#top'>React Pelis</a>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarResponsive'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item active'>
                <a className='nav-link' href='/#top'><i className='fas fa-home'></i> Inicio</a>
              </li>
              {/* <li className='nav-item'>
                  <a className='nav-link' href='/#premiere'><i className='fas fa-ticket-alt'></i> Estrenos</a>
                </li> */}
              {/* <li className='nav-item'>
                  <a className='nav-link' href='/#trend'><i className='fas fa-medal'></i> Más populares</a>
                </li> */}
              <li className='nav-item'>
                <a className='nav-link' href='/#favs'><i className='fas fa-star'></i> Favoritas</a>
              </li>
              <li>
                <Dropdown key={genres.id}>
                  <Dropdown.Toggle variant='danger' id='dropdown-basic'> Géneros </Dropdown.Toggle>
                  <Dropdown.Menu> {genres.map(genre => (
                    <Dropdown.Item eventKey={genre.id} key={genre.id} onSelect={genre => this.changeGenre(genre)}> {genre.name} </Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar;