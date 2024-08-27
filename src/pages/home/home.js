import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import Cards from "../../components/card/card";


const Home = () => {
    
    const [popularMovies, setPopularMovies] = useState([])
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=af309c9b00a33bda2a86ac2d3cfadde4")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results))

    }, [])
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
          
          fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=af309c9b00a33bda2a86ac2d3cfadde4')  
        .then(res => res.json())
        .then(data => setMovieList(data.results))
        .catch(err => console.error(err));
    }

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average : ""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <div className="movie__list">
                    <h2 className="list__title">Trending</h2>
                    <div className="list__cards">
                        {
                            movieList.map(movie => (
                                <Cards movie={movie} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home