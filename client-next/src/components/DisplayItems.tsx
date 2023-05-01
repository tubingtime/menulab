import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";
import AssignToMenu from "./AssignToMenu";
import DeleteItem from "./DeleteItem";

const DisplayItems = ({ items, menus, itemsDispatch }) => {
    const jwtToken = useToken();
    const [updatedItems, setItems] = useState(items);

    return (
        <Fragment>
            <div className="table-responsive-sm">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th colSpan={3}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={item.item_id}>
                                <th className="table-num" scope="row">{i + 1}</th>
                                <td className="table-name">{item.name}</td>
                                <td className="table-description">{item.description}</td>
                                <td className="table-price">{item.price}</td>
                                <td><AssignToMenu item={item} menus={menus} /></td>
                                <td><EditItem item={item} itemsDispatch={itemsDispatch} /></td>
                                <td><DeleteItem item={item} itemsDispatch={itemsDispatch} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment >
    );
};

export default DisplayItems;
