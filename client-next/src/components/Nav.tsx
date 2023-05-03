import React, { Fragment, useState, useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import '@/app/globals.css';
import Link from 'next/link';

import { Silkscreen } from 'next/font/google'
const silkscreen = Silkscreen({
    weight: ['400'],
    subsets: ['latin']
})

const Nav = () => {
    const logout = (e) => {
        signOut();
    }
    const [isOpen, setIsOpen] = useState(false);
    const [sidenavWidth, setSidenavWidth] = useState(200);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };
    const sidenavRef = useRef<HTMLDivElement>(null);
    // TODO: Fix warning related to this. When I passed isOpen to dependency array, 
    // the sideNav broke.
    useEffect(() => {
        if (sidenavRef.current) {
            setSidenavWidth(isOpen ? sidenavRef.current.offsetWidth : 200);
        }
    }, []);

    useEffect(() => {
        if (sidenavRef.current) {
            sidenavRef.current.style.width = isOpen ? `${sidenavWidth}px` : '0';
        }
    }, [isOpen, sidenavWidth]);


    return (
        <Fragment>
            {/* 
      Converted NavBar Below to React
      https://www.codeply.com/p/RXiaRJEqWj */}
            <div>
                <div id="mySidenav" ref={sidenavRef} className="sidenav" style={{ width: `${sidenavWidth}px` }}>
                    <section>
                        <h1 className={silkscreen.className}>MenuLab</h1>
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/dashboard/menus">Menus</Link>
                        <Link href="/dashboard/items">Items</Link>
                    </section>
                </div>
            </div>

            <nav className="navbar navbar-light bg-light">
                <button className="navbar-toggler hamburger-button" type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav} style={{ zIndex: 2 }}>
                    <div className={`animated-icon ${isOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <div className="mx-auto order-0">
                    <Link className="navbar-brand" href="/dashboard">
                        <div className={silkscreen.className}>
                            MenuLab
                        </div>
                    </Link>
                </div>
                <form className="nav-item form-inline" >
                    <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
                </form>
            </nav>

            <br></br>
            <br></br>
        </Fragment>
    );
};

export default Nav;
