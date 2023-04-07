"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import EditItem from "@/components/EditItem";
import { useToken } from '@/lib/SessionManagement';

const Items = () => {

    const jwtToken = useToken();

    const [items, setItems] = useState<any[]>([]);

    const getItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/items", {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            console.log(jsonData);

            // Sort the array by the 'name' field in ascending order
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            setItems(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    const deleteItem = async id => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/item/${id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
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
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(body)
            });
            console.log(response);

            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getItems();
    }, []);


    /* GET ALL THE MENUS TO ASSIGN TO */
    const [menus, setMenus] = useState<any[]>([]);

    useEffect(() => {
        const getMenus = async () => {
            try {
                const response = await fetch("http://localhost:5000/dashboard/menus", {
                    method: "GET",
                    headers: { token: jwtToken }
                });

                const jsonData = await response.json();
                console.log(jsonData);

                // Sort the array by the 'name' field in ascending order
                const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
                setMenus(sortedData);
            } catch (err: any) {
                console.error(err.message);
            };
        }
        getMenus();
    }, []);

    /* ASSIGN ITEM TO MENU */
    const [selectedMenuId, setSelectedMenuId] = useState(null);

    const handleMenuClick = async (item, menu) => {
        try {
            console.log(`Name: ${item.name}, Description: ${item.description}, Price: ${item.price}, Item ID: ${item.item_id}, Menu ID: ${menu.menu_id}`);
            const add_body = {
                name: item.name,
                description: item.description,
                price: item.price,
            };

            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(add_body));

            const assign_body = { menu_id: menu.menu_id };
            // Assign item to menu
            const assignResponse = await fetch(`http://localhost:5000/dashboard/menus/item/${item.item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(assign_body)
            });

        } catch (err: any) {
            console.error(err.message);
        }
    };


    return (
        <Fragment>
            <Nav />
            <section>
                <h1>Items</h1>
            </section>
            <section>
                <h2>Add an Item</h2>
                <form className="mt-2" onSubmit={onSubmitForm2}>
                    <div className="row">

                        <div className="col">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter item name."
                                required
                                className="form-control"
                                value={name}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="col">
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                placeholder="Enter item price."
                                className="form-control"
                                value={price}
                                onChange={e => onChange(e)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Optional: Add an item description."
                                className="form-control"
                                value={description}
                                onChange={e => onChange(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary">Add</button>
                    </div>
                </form>
            </section>
            <section>
                <h2>Items</h2>
                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
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
                                    <td>
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-outline-info dropdown-toggle btn-sm"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Assign To...
                                            </button>
                                            <ul className="dropdown-menu">
                                                {menus.map((menu) => (
                                                    <li key={menu.menu_id}>
                                                        <a className="dropdown-item" href="#" onClick={() => handleMenuClick(item, menu)}>
                                                            {menu.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteItem(item.item_id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </Fragment >
    );
};

export default Items;
