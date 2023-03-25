"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useSearchParams } from 'next/navigation'
import EditItem from "@/components/EditItem";


const ListItems = () => {
    const searchParams = useSearchParams();
    const menu_id = searchParams?.get('menu_id');
    console.log("menuID:"+menu_id);
    const [items, setItems] = useState<any[]>([]);

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        price: ''
    });
    const { name, description, price } = inputs;
    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const addItem = async (e) => {
        e.preventDefault();
        try {
            console.log("onSubmit");
            const add_body = { name, description, price };
            
            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(add_body));

            // Add item to items table
            const addResponse = await fetch("http://localhost:5000/dashboard/item", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(add_body)
            });

            console.log("addResponse:");
            const item_id = await addResponse.json();
            console.log(item_id[0].item_id);
            
            const assign_body = { menu_id };
            // Assign item to menu
            const assignResponse = await fetch(`http://localhost:5000/dashboard/menus/item/${item_id[0].item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(assign_body)
            });

            console.log("assignResponse:");
            console.log(assignResponse);

            //window.location = "/items";
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const getItems = async (menu_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/menus/${menu_id}`, {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            console.log(response);
            setItems(jsonData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    const deleteItem = async (item_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/item/${item_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });
            console.log(response);

            setItems(items.filter(item => item.item_id !== item_id));

        } catch (err: any) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getItems(menu_id);
    }, []);

    return (
        <Fragment>
            <Nav />
            <h1>Items</h1>
            <form className="mt-2" onSubmit={addItem}>
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


export default ListItems;
