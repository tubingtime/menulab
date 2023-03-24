import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import React from 'react';
import "./home.css";
import Link from 'next/link'

function Home(props) {
    return (
        
        <div id="app-container" className="home">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ boxShadow: "0px 0px 8px #888888" }}>
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link href="api/auth/signin" className="btn btn-primary">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <h1 className="home-title">
                <span>MenuLab</span>
            </h1>

        </div>

    );
}

export default Home;