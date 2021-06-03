import React from 'react';
import { Link } from 'react-router-dom';

//Si no se encuentra el componente
var errorGif = [
  'https://media.giphy.com/media/Qxkf4LQ1xIbXpH8z0I/giphy.gif',
  'https://media.giphy.com/media/H7wajFPnZGdRWaQeu0/giphy.gif',
  'https://media.giphy.com/media/11gZBGuDnYwdpu/giphy.gif',
  'https://media.giphy.com/media/WQOIEQRgiK722l3PQT/giphy.gif'
  
]

var randomGif = errorGif[Math.floor(Math.random()*errorGif.length)];

const error404 = () => (
  <div>   
      <div className="col-12 text-center m-8">
          <img src={randomGif} alt="Error"/>
          <h1> Perdon! </h1>
          <p>La página no se encuentra</p>
          <Link to="/">Acá podés volver al Inicio.</Link>
      </div>
  </div>
);

export default error404;