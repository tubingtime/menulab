import React, { Fragment } from "react";
import { useToken } from "@/lib/SessionManagement";

const AssignToMenu = ({ item, menus }) => {
    const jwtToken = useToken();

    const handleMenuClick = async (item, menu) => {
        try {
            const body = { menu_id: menu.menu_id };

            const response = await fetch(`http://localhost:5000/dashboard/menus/item/${item.item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(body)
            });
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-outline-primary dropdown-toggle btn-sm"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Assign
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
        </Fragment>
    )
}

export default AssignToMenu;
