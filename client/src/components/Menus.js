import React, { Fragment, useState, useEffect } from 'react';
import './nav.css';
import Nav from './Nav.js';

const Menus = () => {
    const [menus, setMenus] = useState("");

    const deleteMenu = async id => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/menus/${id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });

            setMenus(menus.filter(menu => menu.menu_id !== id));

        } catch (err) {
            console.error(err.message);
        }
    };

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

    const [name, setName] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log("onSubmit");
            const body = { name };

            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/dashboard/menus", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });
            console.log(response);

            window.location = "/menus";
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMenus();
    }, []);

    // Buttons do not have any functionality yet.
    return (
        <Fragment>
            <Nav />
            <h1>Menus</h1>
            <form className="mt-2" onSubmit={onSubmitForm}>
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            required
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-success">Add</button>
                    </div>
                </div>
            </form>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {menus && menus.map((menu, i) => (
                    <div className="column">
                        <div className="card" key={i} style={{ margin: '20px' }}>
                            <div className="card-header" style={{ textAlign: 'center' }}>
                                {menu.name}
                            </div>
                            <div className="card-body">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <a href="#" className="btn btn-outline-info">Edit</a>
                                    <button className="btn btn-danger" onClick={() => deleteMenu(menu.menu_id)}>Delete</button>
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
