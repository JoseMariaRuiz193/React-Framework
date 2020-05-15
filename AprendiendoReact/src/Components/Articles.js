import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../Global';
import imgdefault from '../assets/images/unnamed.jpg';

class Articles extends Component {

    url = Global.url;

    state = {
        articles: [],
        status: null
    };
    componentWillMount() {
        var home = this.props.home;
        var search = this.props.search;

        if (home === 'true') {
            this.getArticles();
        } else if (search && search != null && search != undefined) {
            this.getArticlesBySearch(search);
        } else {
            this.getArticles();
        }

    }

    getArticlesBySearch = (searched) => {
        axios.get(this.url + "search/" + searched)
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            })
            .catch(error => {
                this.setState({
                    articles: [],
                    status: 'success'
                });
            })
    }
    getLastArticles = () => {
        axios.get(this.url + "articles/last")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });

            });
    }

    getArticles = () => {
        axios.get(this.url + "articles")
            .then(res => {
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                });
                console.log(this.state)
            });
    }
    render() {
        if (this.state.articles.length >= 1) {
            var listArticles = this.state.articles.map((article) => {
                return (
                    <article className="article-item" id="article-template">
                        <div className="image-wrap">
                            {article.image !== null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                            ) : (
                                    <img src={imgdefault} alt={article.title} />
                                )
                            }
                        </div>
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow>{article.date}</Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer más</Link>
                        <div className="clearfix"></div>
                    </article>
                )
            })

            return (
                <div id="articles">
                    {listArticles}
                </div>
            );

        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h1 className="subheader">NO HAY ARTÍCULOS</h1>
                    <p>Todavía no hay contenido en esta sección</p>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h1 className="subheader">Cargando...</h1>
                    <p>Espere mientras se carga</p>
                </div>
            );
        }

    }
}




export default Articles;