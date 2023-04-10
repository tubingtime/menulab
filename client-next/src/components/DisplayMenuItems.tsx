import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";

const DisplayMenuItems = ({ items }) => {
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

export default DisplayMenuItems;
