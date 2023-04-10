import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";

const EditMenuName = ({ menu }) => {
    window.bootstrap = require('bootstrap/js/dist/modal');
    const jwtToken = useToken();
    const [name, setName] = useState(menu.name);

    const updateName = async e => {
        e.preventDefault();
        try {
            const body = { name };

            const response = await fetch(
                `http://localhost:5000/dashboard/menu/${menu.menu_id}`,
                {
                    method: "PUT",
                    headers: { token: jwtToken, "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-outline-info btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#id${menu.menu_id}`}
            >
                Edit
            </button>

            <div
                className="modal"
                id={`id${menu.menu_id}`}
                onClick={() => setName(menu.name)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Menu</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                onClick={() => setName(menu.name)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-info"
                                data-bs-dismiss="modal"
                                onClick={(e) => updateName
                                    (e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                data-bs-dismiss="modal"
                                onClick={() => setName(menu.name)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditMenuName;
