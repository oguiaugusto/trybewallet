import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-page">
        <h1>Página não encontrada</h1>
        <h2>
          {'Por favor, '}
          <Link to="/">clique aqui</Link>
          {' para logar.'}
        </h2>
      </div>
    );
  }
}

export default NotFound;
