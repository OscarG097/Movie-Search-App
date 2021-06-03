import React, { Component } from 'react';
import logo from './../../images/lentes.png'

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moviesF: [],
      loading: false,
      genres: [],
      error: false,
    };
  };

  changeGenre(genres) {
    this.componentDidMount(genres);
  }

  render() {

    return (
      <nav className='navbar navbar-expand-lg navbar-expand-xl bg-danger navbar-dark fixed-top'>
        <div className='container'>
          <a className='navbar-brand' href='/'> <img src={logo} width="130" height="73" alt="logo" /> </a>
          <div className="form-outline">
            <input placeholder="Buscá tu película" /><i className="fas fa-search"></i>
          </div>
          <div className='collapse navbar-collapse' id='navbarResponsive'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item active'>
                <a className='nav-link' href='/'><i className='fas fa-home'></i> Inicio</a>
              </li>
              <li className='nav-item active'>
                <a className='nav-link' href='/#favoritos'><i className='fas fa-star'></i> Favoritas</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar;