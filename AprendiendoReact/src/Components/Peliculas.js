import React, { Component } from 'react';
import Pelicula from './Pelicula';


class Peliculas extends Component {
    state = {};

    cambiarTitulo = () => {
        var { peliculas } = this.state;
        peliculas[0].titulo = "Batman The Dark Knight";
        peliculas[0].image = 'https://images-na.ssl-images-amazon.com/images/I/51NHuXaBKZL._AC_.jpg';
        this.setState({
            peliculas: peliculas
        });
    }

    favorita = (pelicula, indice) => {

        this.setState({
            favorita: pelicula
        });

    }
    componentWillMount() {
        this.setState({
            peliculas: [
                { titulo: 'Batman: El caballero oscuro', image: 'https://www.cope.es/blogs/palomitas-de-maiz/wp-content/uploads/sites/6/2020/04/cartel-interior-el-caballero-oscuro.jpg' },
                { titulo: 'Con derecho a roce', image: 'https://images-na.ssl-images-amazon.com/images/I/71wMvzV%2BVmL._SY445_.jpg' },
                { titulo: 'Hitch', image: 'https://img.discogs.com/OudJxaqR1HvMmLF-8f82ZK4fF74=/fit-in/600x601/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-4614552-1369992323-4142.jpeg.jpg' }

            ],
            nombre: 'José María Ruíz',
            favorita: {}
        })
    }
    render() {
        var pStyle = {
            background: '#4D9BE3',
            color: 'white',
            padding: '10px'
        };
        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La pelicula favorita es: </strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            );
        } else {
            favorita = (
                <p style={pStyle}>No hay película favorita</p>
            )
        }
        return (
            <div id='content' className="peliculas">
                <h2 className="subheader">Películas</h2>
                <p>Las películas favoritas de {this.state.nombre}</p>
                <p>
                    <button onClick={this.cambiarTitulo}>
                        Cambiar titulo e imagen Batman
                    </button>
                </p>
                {/* {this.state.favorita.titulo ? (
                    <p className="favorita" style={pStyle}>
                        <strong>La pelicula favorita es: </strong>
                        <span>{this.state.favorita.titulo}</span>
                    </p>
                ) : (
                        <p style={pStyle}>No hay película favorita</p>
                    )
                }*/}
                {favorita}

                <div id="articles" className="peliculas">
                    {
                        this.state.peliculas.map((pelicula, i) => {
                            return (
                                <Pelicula
                                    key={i}
                                    pelicula={pelicula}
                                    indice={i}
                                    marcarFavorita={this.favorita} />
                            )
                        })
                    }
                </div>

            </div>
        );
    }
}





export default Peliculas;