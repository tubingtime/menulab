import React, { Fragment, useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import './nav.css';

const Nav = ({ setAuth }) => {

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
        toast.success("Logged out successfully!");
    }
    const [isOpen, setIsOpen] = useState(false);
    const [sidenavWidth, setSidenavWidth] = useState(200);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    // TODO: Fix warning related to this. When I passed isOpen to dependency array, 
    // the sideNav broke.
    useEffect(() => {
        setSidenavWidth(isOpen ? sidenavRef.current.offsetWidth : 200);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        sidenavRef.current.style.width = isOpen ? `${sidenavWidth}px` : '0';
    }, [isOpen, sidenavWidth]);

    const sidenavRef = useRef(null);

    return (
        <Fragment>
            {/* 
      Converted NavBar Below to React
      https://www.codeply.com/p/RXiaRJEqWj */}
            <div>
                <div id="mySidenav" ref={sidenavRef} className="sidenav" style={{ width: `${sidenavWidth}px` }}>
                    <h1>Manage</h1>
                    <a href="menus">Menus</a>
                    <a href="items">Items</a>
                </div>
            </div>

            <nav className="navbar navbar-light bg-light" style={{ boxShadow: "0px 0px 8px #888888" }} >
                <button className="navbar-toggler hamburger-button" type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav} style={{ zIndex: 2 }}>
                    <div className={`animated-icon ${isOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <div className="mx-auto order-0">
                    <a className="navbar-brand" href="dashboard">MenuLab</a>
                </div>
                <form className="form-inline">
                    <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
                </form>
            </nav>
            <br></br>
            <br></br>
        </Fragment>
    );
};

export default Nav;