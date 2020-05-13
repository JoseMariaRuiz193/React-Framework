import React, { Component } from 'react';
import MiComponente from './MiComponente';




class SeccionPruebas extends Component {

    contador = 0;

   /* constructor(props) {
        super(props);
        this.state = {
            contador: 0
        };
    }*/
    state = {
        contador: 0
    };

    HolaMundo(nombre) {
        var presentacion = (
            <h1>React, realizado por: {nombre}</h1>
        );
        return presentacion;
    }
    sumar = (e)=> {
        //this.contador = this.contador + 1;
       this.setState({
           contador: (this.state.contador + 1)
       });

    }
    restar= (e)=> {
        // this.contador = this.contador - 1;
       this.setState({
        contador: (this.state.contador - 1)
    });

    }
    render() {
        var nombre = 'José María Ruíz Domínguez';
        return (
            <section id="content">
                <h2 className="subheader">Últimos árticulos</h2>

                <h2 className="subheader">Funciones y JSX básico</h2>

                {this.HolaMundo(nombre)}
                <h2 className="subheader">Componentes</h2>

                <section className="componentes">
                    <MiComponente />
                   
                </section>
                <h2 className="subheader">Estado</h2>
                <p>
                    Contador: {this.state.contador}
                </p>
                <input type="button" value="Sumar" onClick={this.sumar} />
                <input type="button" value="Restar" onClick={this.restar} />

            </section>
        );
    }
}




export default SeccionPruebas;