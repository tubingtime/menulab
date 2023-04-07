import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";

const DisplaySectionItems = ({ section_id, sections}) => {

    const jwtToken = useToken();

    const [sectionItems, setSectionItems] = useState<any[]>([]);

    const getSectionItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/section/${section_id}`, {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            console.log(response);
            // Sort the array by the 'name' field in ascending order
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));

            setSectionItems(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    const handleSectionClick = async (item, section) => {
        try {
            console.log(`Name: ${item.name}, Description: ${item.description}, Price: ${item.price}, Item ID: ${item.item_id}, Section ID: ${section.section_id}`);
            const add_body = {
                name: item.name,
                description: item.description,
                price: item.price,
            };

            /* fetch() makes a GET request by default. */
            console.log(JSON.stringify(add_body));

            const assign_body = { section_id: section.section_id };
            // Assign item to section
            const assignResponse = await fetch(`http://localhost:5000/dashboard/section/item/${item.item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(assign_body)
            });
            window.location.reload();

        } catch (err: any) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getSectionItems();
    }, []);

    const deleteItem = async (id) => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/dashboard/item/${id}`, {
                method: "DELETE",
                headers: { token: jwtToken }
            });

            setSectionItems(sectionItems.filter(item => item.item_id !== id));
            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
        }
    };



    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white' }}>
                {(sectionItems && sectionItems.length > 0) ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectionItems.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td><EditItem item={item} /></td>
                                    <td>
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-outline-info dropdown-toggle btn-sm"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Assign To...
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
                                    </td>
                                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteItem(item.item_id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items in this section</p>
                )}
            </div>
        </Fragment >
    );
};

export default DisplaySectionItems;
