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

    return (
        <Fragment>
            {sections.map((section, i) => (
                <div key={i}>
                    <h2>{section.name}</h2>
                    <DisplaySectionItems section_id={section.section_id} sections={sections} />
                    <br />
                </div>
            ))}
        </Fragment>
    )

}

export default DisplaySections;
