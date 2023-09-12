import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";

const DeleteItem = ({item, itemsDispatch}) => {

    const jwtToken = useToken();

    const deleteCloudinaryImage = async (publicId) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/api/${publicId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: jwtToken,
                },
            });

        } catch (error) {
            console.error("Failed to delete image:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/item/${id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
            });

            itemsDispatch({
                type: 'deleted',
                item: item
            });
            
            if (item.photo_reference) {
                await deleteCloudinaryImage(item.photo_reference);
            }
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#delete-item-modal-${item.item_id}`}
            >
                Delete
            </button>
            <div
                className="modal"
                id={`delete-item-modal-${item.item_id}`}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"> Confirm Deletion </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            Are you sure you want to delete <b>{item.name}</b>? This action cannot be undone.
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-info"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => deleteItem(item.item_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DeleteItem;