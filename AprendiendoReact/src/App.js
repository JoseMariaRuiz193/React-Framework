import React from 'react';
import './assets/css/App.css';
//importar componentes

import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Peliculas from './components/Peliculas';

function App() {
  var buttonString = "Ir al Blog";
  return (
    <div className="App">
      <Header />
      <Slider
        title="Frameworks por: Jose María Ruíz Domínguez"
        btn={buttonString}
      />
      <div className="center">
        <Peliculas />
        <Sidebar />
        <div className="clearfix"></div>
      </div>
      <Footer />

    </div>
  );
}

export default App;
