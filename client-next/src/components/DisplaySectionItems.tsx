import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";
import AssignToSection from "./AssignToSection";
import DeleteItem from "./DeleteItem";
import Image from 'next/image'
import { IncomingMessage } from "http";
import { Card } from "react-bootstrap";

const DisplaySectionItems = ({ section_id, sections }) => {

    const jwtToken = useToken();

    const [sectionItems, setSectionItems] = useState<any[]>([]);

    const getSectionItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/section/${section_id}`, {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const jsonData = await response.json();
            const sortedData = jsonData.sort((a, b) => a.name.localeCompare(b.name));
            setSectionItems(sortedData);
        } catch (err: any) {
            console.error(err.message);
        };
    }

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

            {(sectionItems && sectionItems.length > 0) ? (
                <div className="card-deck row row-cols-1 row-cols-md-2 g-4">

                    {sectionItems.map((item, i) => (
                        <div className="column" key={i}>
                            <div className="card" >
                                <div className="card-body">
                                    <div className="containter">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="card-title">{item.name}</div>
                                                <p className="card-text">{item.price}</p>

                                            </div>
                                            <div className="col-4">
                                                <Card.Img
                                                    variant="primary"
                                                    src="/image-placeholder.png"
                                                    className=" img-fluid"

                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <p className="text-muted">{item.description}</p>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <AssignToSection item={item} sections={sections} />
                                                <EditItem item={item} />
                                                <DeleteItem item={item} items={sectionItems} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    ))}
                </div>

            ) : (
                <p>No items in this section</p>
            )
            }
            {/* <div style={{ backgroundColor: 'white' }}>
                {(sectionItems && sectionItems.length > 0) ? (
                
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {sectionItems.map((item, i) => (
                            <div key={i} className="col">
                            <div className="card" style={{ width: 'auto', height: '20rem' }}>
                              <div className="card-body d-flex">
                                <div className="w-50 pr-3">
                                  <h5 className="card-title">{item.name}</h5>
                                  <small className="text-muted">{item.price}</small>
                                  <p className="card-text">{item.description}</p>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                      <EditItem item={item} />
                                      <AssignToSection item={item} sections={sections} />
                                      <DeleteItem item={item} items={sectionItems} />
                                    </div>
                                  </div>
                                </div>
                                <div className="w-50 position-relative">
                                  <Card.Img
                                    variant="primary"
                                    src="/image-placeholder.png"
                                    style={{ width: '275px', height: '250px', top: '10px', left: '0px', position: 'absolute' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          

                        ))}
                    </div>
                ) : (
                    <p>No items in this section</p>
                )}
            </div> */}


        </Fragment >
    );
};

export default DisplaySectionItems;
