import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";

const DisplayItems = ({ items, menus }) => {

    const jwtToken = useToken();

    const [updatedItems, setItems] = useState(items);

    const deleteItem = async (id) => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/item/${id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
            });

            setItems(updatedItems.filter(item => item.item_id !== id));
            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    };

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
        </Fragment >
    );
};

export default DisplayItems;
