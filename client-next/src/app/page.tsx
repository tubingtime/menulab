import React from 'react';
import "./home.css";
import HomeNav from '@/components/HomeNav';

import { Silkscreen } from 'next/font/google'
const silkscreen = Silkscreen({
    weight: ['400'],
    subsets: ['latin'],
    display: "auto"
})

function Home() {
    return (
        <div>
            <HomeNav />
            <div id="app-container" className="home">
                <section>
                    <h1 className="home-title">
                        <span className={silkscreen.className}>MenuLab</span>
                    </h1>
                </section>
            </div>
        </div>
    );
}

export default Home;
