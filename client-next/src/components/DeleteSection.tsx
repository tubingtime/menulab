import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";

const DeleteSection = ({ section, sectionsDispatch }) => {
    const jwtToken = useToken();
    const [updatedsections, setSections] = useState<any[]>([]);

    const deleteSection = async id => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/section/${id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
            });

            sectionsDispatch({
                type: 'deleted',
                section: section
            })
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-danger btn-sm mt-3"
                data-bs-toggle="modal"
                data-bs-target={`#delete-section-modal-${section.section_id}`}
            >
                Delete Section
            </button>
            <div
                className="modal"
                id={`delete-section-modal-${section.section_id}`}
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
                            Are you sure you want to delete <b>{section.name}</b>? This action cannot be undone.
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
                                onClick={() => deleteSection(section.section_id)}
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

export default DeleteSection;
