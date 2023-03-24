import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const EditItem = ({ item }) => {

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
                    headers: { token: localStorage.token },
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            window.location = "/items";
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${item.item_id}`}
            >
                edit
            </button>

            <div
                className="modal"
                id={`id${item.item_id}`}
                onClick={() => setDescription(item.description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
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
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={(e) => updateItem(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
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
