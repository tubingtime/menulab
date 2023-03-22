import React, { Fragment, useState, useEffect } from 'react';
import Nav from './Nav';
import './nav.css';

const MenuItems = () => {

    const [menuItems, setMenuItems] = useState("");

    const getMenuItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/menus/:menu_id", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            console.log(jsonData);
            setMenuItems(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getMenuItems();
    }, []);

    return (
        <Fragment>
            <Nav />
            <h1>Menu Items</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems && menuItems.map((menuItem) => (
                        <tr key={menuItem.id}>
                            <td>{menuItem.name}</td>
                            <td>{menuItem.description}</td>
                            <td>{menuItem.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default MenuItems;
