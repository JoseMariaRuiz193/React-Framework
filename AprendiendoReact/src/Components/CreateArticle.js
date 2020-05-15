import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';



class CreateArticle extends Component {

    render() {



        return (

            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear artículo</h1>

                    <form className="mid-form">
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" />
                        </div>

                        <input type="submit" value="guardar"  className="btn btn-success"/>
                    </form>


                </section>
                <Sidebar />
            </div>
        );
    }
}


export default CreateArticle;