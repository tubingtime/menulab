"use client"

import React, { Fragment, useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useSearchParams } from 'next/navigation'
import EditItem from "@/components/EditItem";
import { useToken } from '@/lib/SessionManagement';


const ListItems = () => {

    const jwtToken = useToken();

    const searchParams = useSearchParams();
    const menu_id = searchParams?.get('menu_id');
    const [items, setItems] = useState<any[]>([]);

    const [menuName, setMenuName] = useState("");

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
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(add_body)
            });

            console.log("addResponse:");
            const item_id = await addResponse.json();
            console.log(item_id[0].item_id);

            const assign_body = { menu_id };
            // Assign item to menu
            const assignResponse = await fetch(`http://localhost:5000/dashboard/menus/item/${item_id[0].item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(assign_body)
            });

            console.log("assignResponse:");
            console.log(assignResponse);

            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const getItems = async (menu_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/menus/${menu_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            console.log(response);
            // Sort the array by the 'name' field in ascending order
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));

            setItems(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    const deleteItem = async (item_id) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/item/${item_id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
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




    /* GET ALL THE SECTIONS TO ASSIGN TO */
    const [sections, setSections] = useState<any[]>([]);


    useEffect(() => {
        const getMenuName = async () => {
            try {
                if (jwtToken === "null" || menu_id === null) {
                    return;
                }
                const response = await fetch(`http://localhost:5000/dashboard/menu/${menu_id}`, {
                    method: "GET",
                    headers: { token: jwtToken }
                });

                const jsonData = await response.json();

                // Sort the array by the 'name' field in ascending order
                setMenuName(jsonData);
                console.log("menu name data " + jsonData);
                console.log(jsonData);

            } catch (err: any) {
                console.error(err.message);
            };
        }
        getMenuName();
    }, [jwtToken]);

    useEffect(() => {
        const getSections = async () => {
            try {
                if (jwtToken === "null") {
                    return;
                }
                const response = await fetch(`http://localhost:5000/dashboard/sections/${menu_id}`, {
                    method: "GET",
                    headers: { token: jwtToken }
                });

                const jsonData = await response.json();
                console.log(jsonData);

                // Sort the array by the 'name' field in ascending order
                const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
                setSections(sortedData);
            } catch (err: any) {
                console.error(err.message);
            };
        }
        getSections();
    }, [jwtToken]);

    

    /* ASSIGN ITEM TO SECTION */
    const [selectedSectionId, setSelectedSectionId] = useState(null);

    const handleSectionClick = async (item, section) => {
        try {
            console.log(`Name: ${item.name}, Description: ${item.description}, Price: ${item.price}, Item ID: ${item.item_id}, Section ID: ${section.section_id}`);
            const add_body = {
                name: item.name,
                description: item.description,
                price: item.price,
            };

            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(add_body));

            const assign_body = { section_id: section.section_id };
            // Assign item to section
            const assignResponse = await fetch(`http://localhost:5000/dashboard/section/item/${item.item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(assign_body)
            });

        } catch (err: any) {
            console.error(err.message);
        }
    };

    /* GET ALL SECTION ITEMS */
    const [sectionItems, setSectionItems] = useState<any[]>([]);

    const getSectionItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/section/${section_id}`, {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            console.log(response);
            // Sort the array by the 'name' field in ascending order
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));

            setSectionItems(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }



    return (
        <Fragment>
            <Nav />
            <section>
                <h1>Items</h1>
                <h2>{menuName}</h2>
            </section>
            <section>
                <h2>Add an Item</h2>
                <form className="mt-2" onSubmit={addItem}>
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
                    </div>
                </form>
            </section>

            <section>
                <h2>Items</h2>

                <div>
                    {sections.map((section) => (
                        <div key={section.id}>
                            <h2>{section.name}</h2>
                            {section.items && section.items.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sectionItems.map((item) => (
                                            <tr key={item.id}>
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
                                                            {sections.map((section) => (
                                                                <li key={section.id}>
                                                                    <a className="dropdown-item" href="#" onClick={() => handleSectionClick(item, section)}>
                                                                        {section.name}
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
                            ) : (
                                <p>No items in this section</p>
                            )}
                        </div>
                    ))}
                </div>




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
                                                {sections.map((section) => (
                                                    <li key={section.id}>
                                                        <a className="dropdown-item" href="#" onClick={() => handleSectionClick(item, section)}>
                                                            {section.name}
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
        </Fragment>
    );
};


export default ListItems;
