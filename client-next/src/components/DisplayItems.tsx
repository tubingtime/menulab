import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";

const DisplayItems = ({ items, menus }) => {
    const jwtToken = useToken();

    return (
        <Fragment>
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
                                                    <a className="dropdown-item" href="#" >
                                                        {menu.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </td>
                                <td><button className="btn btn-outline-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment >
    );
};

export default DisplayItems;
