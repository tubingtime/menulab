"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import EditItem from "@/components/EditItem";


const Items = () => {
    const [items, setItems] = useState<any[]>([]);

    const getItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/items", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            console.log(jsonData);
            setItems(jsonData);
        } catch (err: any) {
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

        } catch (err: any) {
            console.error(err.message);
        }
    };

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        price: ''
    });
    const { name, description, price } = inputs;
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitForm2 = async (e) => {
        e.preventDefault();
        try {
            console.log("onSubmit");
            const body = { name, description, price };
            
            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/dashboard/item", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(body)
            });
            console.log(response);

            //window.location = "/items";
        } catch (err: any) {
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
            <form className="mt-2" onSubmit={onSubmitForm2}>
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            required
                            className="form-control"
                            value={name}
                            onChange={e => onChange(e)}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="description"
                            className="form-control"
                            value={description}
                            onChange={e => onChange(e)}
                        />
                        <input
                            type="text"
                            name="price"
                            placeholder="price"
                            className="form-control"
                            value={price}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-success">Add</button>
                    </div>
                </div>
            </form>
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

export default Items;
