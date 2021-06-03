import React,{Component} from 'react';
import MovieRow from '../MovieRow/Single';

class Favs extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: false,
      error: false,

    };
  };
  
  componentDidMount() {
    const movies = localStorage.getItem("favs-movies");
    if (movies) {
      this.setState({ movies: JSON.parse(movies) });
    }
  }
  
  render() {
    const { movies, loading, error } = this.state;

     return (
      <div className="col-12 anchor" id="favoritos">
      <h1>Mis favoritos</h1>
      <div className="row">
          {!loading && movies.map(movie =>
           <MovieRow movie ={movie}  key={movie.id}/>
          )}
          {loading && 
          <div className="col-12 text-center">
            <p>Cargando información...</p>
            </div>
        }
          {!loading && !error && !movies.length && 
            <div className="col-12 text-center">
              <h3>Todavía no agregaste ninguna película.</h3>
            </div>
            }
          {!loading && error && 
            <div className="col-12 text-center">
                <h2>Ocurrió un error.</h2>
            </div>
            }
      </div>
   </div>
     );
   }
 };
 export default Favs;