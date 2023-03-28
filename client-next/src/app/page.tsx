import { Silkscreen } from 'next/font/google'
const silkscreen = Silkscreen({
    weight: ['400'],
    subsets: ['latin']
})

import React from 'react';
import "./home.css";
import Link from 'next/link'
import HomeNav from '@/components/HomeNav';

function Home(props) {
    return (

        <div id="app-container" className="home">
            <HomeNav />
            <section>
                <h1 className="home-title">
                    <span className={silkscreen.className}>MenuLab</span>
                </h1>
            </section>

        </div>

    );
}

export default Home;
