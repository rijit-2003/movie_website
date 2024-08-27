
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../card/card';
import '../movieList/movieList.css'

export default function Searchres() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    useEffect(() => {
        if (query) {
            // Fetch data based on the query
            // Example: Fetch movies from an API based on the query
            fetchMovies(query);
            
        }
    }, [query]);

    const fetchMovies = async (query) => {
        try {
            
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1&api_key=af309c9b00a33bda2a86ac2d3cfadde4`);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    return (
        <div className="movie__list">
        <h2 className="list__title">Search Results for "{query}"</h2>
        <div className="list__cards">
            {
                searchResults.map(movie => (
                    <Cards movie={movie} />
                ))
            }
        </div>
    </div>
    );
}
