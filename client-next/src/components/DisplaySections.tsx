import React, { Fragment, useState, useEffect, useReducer } from "react";
import { useToken } from "@/lib/SessionManagement";
import DisplaySectionItems from "./DisplaySectionItems";
import AddSection from "./AddSection";
import { Accordion } from 'react-bootstrap';
import sectionsReducer from "@/lib/sectionsReducer";
import DeleteSection from "./DeleteSection";

const DisplaySections = ({ menu_id, itemsDispatch, items}) => {
    const jwtToken = useToken();
    const [sections, sectionsDispatch] = useReducer(sectionsReducer, [])

    const getSections = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/sections/${menu_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            sectionsDispatch({
                type: 'set',
                sections: sortedData
            });
        } catch (err: any) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getSections()
    }, []);

    return (
        <Fragment>
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <h2>Sections</h2>
                    <AddSection menu_id={menu_id} sectionsDispatch={sectionsDispatch} />
                </div>
            </section>
            <section>
                <Accordion flush>
                    {sections.map((section) => (
                        <Accordion.Item eventKey={section.section_id.toString()} key={section.section_id}>
                            <Accordion.Header>{section.name}</Accordion.Header>
                            <Accordion.Body>
                                <DisplaySectionItems section_id={section.section_id} sections={sections} itemsDispatch={itemsDispatch} items={items} />
                                <div className="d-flex justify-content-end">
                                    <DeleteSection section={section} sectionsDispatch={sectionsDispatch} />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                    ))}
                </Accordion>
            </section>
        </Fragment>
    )

}

export default DisplaySections;
