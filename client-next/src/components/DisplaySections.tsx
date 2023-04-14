import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import DisplaySectionItems from "./DisplaySectionItems";
import AddSection from "./AddSection";
import DeleteSection from "./DeleteSection";

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
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            setSections(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    async function handleAddSection(formData: FormData) {
        const sectionName = formData.get("name")?.toString() || "null";
        const jsonBody = { name: sectionName }
        try {
            const addSectionResponse = await fetch(`http://localhost:5000/dashboard/section/${menu_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(jsonBody)
            })
            setSections([...sections, { name: sectionName }])
        } catch (err: any) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getSections()
    }, []);

    return (
        <Fragment>
            <AddSection handleAddSection={handleAddSection} />
            {sections.map((section, i) => (
                <div key={i}>
                    <h2>{section.name} <DeleteSection section={section} sections={sections} /></h2>
                    <DisplaySectionItems section_id={section.section_id} sections={sections} />
                    <br />
                </div>
            ))}
        </Fragment>
    )

}

export default DisplaySections;
