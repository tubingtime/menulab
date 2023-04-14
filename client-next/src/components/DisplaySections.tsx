import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import DisplaySectionItems from "./DisplaySectionItems";
import AddSection from "./AddSection";
import DeleteSection from "./DeleteSection";
import { Accordion, AccordionToggle, AccordionCollapse, Card, Button } from 'react-bootstrap';

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
            <Accordion defaultActiveKey="0">
            {sections.map((section, i) => (
                <Accordion.Item eventKey={i.toString()} key={i}>
                <Accordion.Header>{section.name}</Accordion.Header>
                <Accordion.Body style={{}}>
                    <DisplaySectionItems section_id={section.section_id} sections={sections} />
                </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
        </Fragment>
    )

}

export default DisplaySections;
