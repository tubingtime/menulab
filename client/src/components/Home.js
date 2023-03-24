import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home(props) {
    return (
        <div id="app-container" className="home">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ boxShadow: "0px 0px 8px #888888" }}>
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/login" className="btn btn-primary">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <h1 class="home-title">
                <span>MenuLab</span>
            </h1>
        </div>

    );
}

export default Home;