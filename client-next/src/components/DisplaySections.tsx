import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import DisplaySectionItems from "./DisplaySectionItems";
import AddSection from "./AddSection";

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
    useEffect(() => {
        getSections()
    }, []);

    const [selectedSectionId, setSelectedSectionId] = useState(null);

    const handleSectionClick = async (item, section) => {
        try {
            const addBody = {
                name: item.name,
                description: item.description,
                price: item.price,
            };;

            const assignBody = { section_id: section.section_id };
            const assignResponse = await fetch(`http://localhost:5000/dashboard/section/item/${item.item_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: localStorage.token },
                body: JSON.stringify(assignBody)
            });

        } catch (err: any) {
            console.error(err.message);
        }
    };

    async function handleAddSection(formData: FormData) {
        const sectionName = formData.get("name")?.toString() || "null";
        const jsonBody = { name: sectionName }
        try {
            const addSectionResponse = await fetch(`http://localhost:5000/dashboard/section/${menu_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(jsonBody)
            })
            if (!addSectionResponse.ok)
                throw new Error(addSectionResponse.statusText);
            else
                setSections([{ name: sectionName }, ...sections])
        } catch (err: any) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="mb-5">
                <AddSection handleAddSection={handleAddSection} />
            </div>
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
