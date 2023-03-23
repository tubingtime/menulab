import React, { Fragment, useState, useEffect } from 'react';
import './nav.css';
import Nav from './Nav.js';

const Menus = () => {
    const [menus, setMenus] = useState("");

    const getMenus = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            setMenus(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getMenus();
    }, []);

    return (
        <Fragment>
            <Nav />
            <h1>Menus</h1>
            <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {menus && menus.map((menu) => (
                        <li key={menu.id}>
                            <button
                                type="button"
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    padding: '0.5rem',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                }}>
                                {menu.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}

export default Menus;
