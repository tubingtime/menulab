import { Silkscreen } from 'next/font/google'
const silkscreen = Silkscreen({
    weight: ['400'],
    subsets: ['latin']
})

import React from 'react';
import "./home.css";
import Link from 'next/link'

function Home(props) {
    return (

        <div id="app-container" className="home">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top " style={{ boxShadow: "0px 0px 8px #888888" }}>
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link href="api/auth/signin?callbackUrl=%2Fdashboard" className="btn btn-primary">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section>
                <h1 className="home-title">
                    <span className={silkscreen.className}>MenuLab</span>
                </h1>
            </section>

        </div>

    );
}

export default Home;
