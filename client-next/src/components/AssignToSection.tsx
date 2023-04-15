import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";

const AssignToSection = ({ item, sections }) => {
    const jwtToken = useToken();

    const handleSectionClick = async (item, section) => {
        try {
            // TODO: Need to check if already assigned to a section.
            // If already assigned to a section, then unassign and assign to the new section.
            const body = {
                section_id: section.section_id
            };

            const response = await fetch(`http://localhost:5000/dashboard/section/item/${item.item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(body)
            });
            console.log(response);
            //window.location.reload();
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
                    {sections.map((section, i) => (
                        <li key={i}>
                            <a className="dropdown-item" onClick={() => handleSectionClick(item, section)}>
                                {section.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    )
}

export default AssignToSection;
