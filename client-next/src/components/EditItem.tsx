import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useToken } from "@/lib/SessionManagement";

const EditItem = ({ item }) => {
    const jwtToken = useToken();

    const [description, setDescription] = useState(item.description);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);

    const updateItem = async e => {
        e.preventDefault();
        try {
            const body = { name, description, price };

            const response = await fetch(
                `http://localhost:5000/dashboard/item/${item.item_id}`,
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
                data-bs-target={`#id${item.item_id}`}
            >
                Edit
            </button>

            <div
                className="modal"
                id={`id${item.item_id}`}
                onClick={() => setDescription(item.description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Item</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(item.description)}
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
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-info"
                                data-bs-dismiss="modal"
                                onClick={(e) => updateItem(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(item.description)}
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

export default EditItem;
