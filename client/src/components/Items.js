import React, { Fragment, useState, useEffect } from 'react';
import Nav from './Nav';
import './nav.css';

const Items = () => {

    const [items, setItems] = useState("");

    const getItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/items", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            console.log(jsonData);
            setItems(jsonData);
        } catch (err) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Fragment>
            <Nav />
            <h1>Items</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Items;
