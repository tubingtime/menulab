import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import DisplaySectionItems from "./DisplaySectionItems";


const DisplaySections = ({ menu_id }) => {
    const jwtToken = useToken();
    const [sections, setSections] = useState<any[]>([]);
    const getSections = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/sections/${menu_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            console.log(jsonData);

            // Sort the array by the 'name' field in ascending order
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            setSections(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }
    useEffect(() => {
        getSections()
    }, []);

    /* ASSIGN ITEM TO SECTION */
    const [selectedSectionId, setSelectedSectionId] = useState(null);

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

        } catch (err: any) {
            console.error(err.message);
        }
    };


    return (
        <Fragment>
            <div>
                {sections.map((section, i) => (
                    <div key={i}>
                        <h2>{section.name}</h2>
                        <DisplaySectionItems section_id={section.section_id} sections={sections} />
                    </div>
                ))}
            </div>
        </Fragment>
    )

}

export default DisplaySections;
