import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";
import AssignToMenu from "./AssignToMenu";
import DeleteItem from "./DeleteItem";

const DisplayItems = ({ items, menus }) => {
    const jwtToken = useToken();
    const [updatedItems, setItems] = useState(items);

    return (
        <Fragment>

            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th colSpan={2}></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td className="table-name">{item.name}</td>
                                <td className="table-description">{item.description}</td>
                                <td className="table-price">{item.price}</td>
                                <td><EditItem item={item} /></td>
                                <td><AssignToMenu item={item} menus={menus} /></td>
                                <td><DeleteItem item={item} items={items}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment >
    );
};

export default DisplayItems;
