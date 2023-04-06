import React, { Fragment, useState, useEffect } from 'react';
import Nav from './Nav';
import './nav.css';
import EditItem from "./EditItem";


const ListItems = ({id}) => {
    console.log(id);

    const [items, setItems] = useState([]);

    const getItems = async id => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/menus/${id}`, {
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

    const deleteItem = async id => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/item/${id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });

            setItems(items.filter(item => item.item_id !== id));

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Fragment>
            <Nav />
            <h1>Items</h1>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '20px' }}>
                <div style={{ maxWidth: '800px' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td><EditItem item={item} /></td>
                                    <td><button className="btn btn-danger" onClick={() => deleteItem(item.item_id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};


export default ListItems;
