import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
function HolaMundo(nombre) {
  var presentacion = 
  <h2>React, realizado por: {nombre}</h2>
  return presentacion;
}
function App() {
  var nombre = 'José María Ruíz Domínguez';
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         {HolaMundo(nombre)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
