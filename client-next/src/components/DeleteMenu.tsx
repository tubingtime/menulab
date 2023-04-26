import React, { useContext, Fragment } from "react";
import { useToken } from "@/lib/SessionManagement";
import { MenusDispatchContext } from "@/lib/menusContext";

const DeleteMenu = ({ menu }) => {
    const jwtToken = useToken();

    const dispatch = useContext(MenusDispatchContext);

    const deleteMenu = async id => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/menus/${id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
            });

            dispatch({
                type: 'deleted',
                menu: menu
            })
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
                data-bs-target={`#delete-menu-modal-${menu.menu_id}`}
            >
                Delete
            </button>
            <div
                className="modal"
                id={`delete-menu-modal-${menu.menu_id}`}
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
                            Are you sure you want to delete <b>{menu.name}</b>? This action cannot be undone.
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
                                onClick={() => deleteMenu(menu.menu_id)}
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

export default DeleteMenu;
