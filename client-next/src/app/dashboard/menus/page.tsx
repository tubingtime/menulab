"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';

const Menus = () => {
    const [menus, setMenus] = useState<any[]>([]);

    const getMenus = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            setMenus(jsonData);
            console.log(jsonData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getMenus();
    }, []);

    // Buttons do not have any functionality yet.
    return (
        <Fragment>
            <Nav />
            <h1>Menus</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {menus && menus.map((menu, i) => (
                    <div className="column" key={i}>
                        <div className="card" style={{ margin: '20px' }}>
                            <div className="card-header" style={{ textAlign: 'center' }}>
                                {menu.name}
                            </div>
                            <div className="card-body">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <a href="#" className="btn btn-outline-info">Edit</a>
                                    <a href="#" className="btn btn-outline-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment >
    );
}

export default Menus;
