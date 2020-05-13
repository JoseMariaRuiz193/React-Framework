import React, { Component } from 'react';


class MiComponente extends Component {
    render() {
        let receta = {
            nombre: 'Kebab',
            ingredientes: ['ternera', 'pollo', 'salsas'],
            calorias: 500
        };
        return (
            <div>
                <h1>Como hacer un:  {receta.nombre}</h1>
                <h2>Calorias: {receta.calorias}</h2>
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }

                </ol>
            </div>

        );
    }
}

export default MiComponente;

//                <h3>Ingredientes necesarios: {receta.ingredientes[0]}, {receta.ingredientes[1]}, {receta.ingredientes[2]}.</h3>
