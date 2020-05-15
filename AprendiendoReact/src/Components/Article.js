import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';
import imgdefault from '../assets/images/unnamed.jpg';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                });
            }).catch(error => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            });
    }

    render() {
        var article = this.state.article;

        return (
            <div className="center">
                <section id="content">

                    {this.state.article &&
                        <article className="article-item article-detail">
                            <h1 className="subheader">{article.title}</h1>
                            <div className="image-wrap">
                                {article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                        <img src={imgdefault} alt={article.title} />
                                    )
                                }                            </div>
                            <span className="date">
                                <Moment locale='es' fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <button href="#" className="btn-danger">Eliminar</button>
                            <br/>
                            <button href="#" className="btn-warning">Editar</button>

                            <div className="clearfix"></div>
                        </article>
                    }

                    {!this.state.article && this.state.status === 'success' &&
                        <div className="article">
                            <h2 className="subheader">El artículo no existe</h2>
                            <p>Intentalo más tarde</p>
                        </div>
                    }
                    {this.state.status == null &&
                        <div className="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espera unos segundos</p>
                        </div>
                    }


                </section>
                <Sidebar />
            </div >

        );
    }
}


export default Article;