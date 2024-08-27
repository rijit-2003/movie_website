import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const Header = () => {
    
    const [query, setQuery] = useState('');
    const navigate = useNavigate(); // Using useNavigate hook
  
    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      
      navigate(`/search?q=${encodeURIComponent(query)}`); // Using navigate function to navigate to the search result page
      console.log(query)
    };
  
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" /></Link>
                
                <Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></Link>

            </div>
            <div className="headerRight d-flex align-items-center">
                <form className="d-flex" onSubmit={handleFormSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search<i className="bi bi-search"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Header