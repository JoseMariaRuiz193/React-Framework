import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';

class Header extends Component {

    render() {
        return (
            <header id="header" className="header">
            <div className="center">
                {/* LOGO-->*/}
                <div id="logo">
                    <img src={logo} className="app-logo" alt="Logotipo" />
                    <span id="brand" className="brand">
                        <strong>Curso</strong>React
                    </span>
                </div>
                {/*MENU*/}
                <nav id="menu" className="menu">
                    <ul>
    
                        <li>
                            <a href="./blog.html">Blog</a>
                        </li>
                        <li>
                            <a href="./formulario.html">Formulario</a>
                        </li>
                        <li>
                            <a href="#">Página 1</a>
                        </li>
                        <li>
                            <a href="#">Página 2</a>
                        </li>
                    </ul>
    
                </nav>
                {/*--limpiar flotados-*/}
                <div className="clearfix"></div>
            </div>
        </header>
        );
    }
}



export default Header;