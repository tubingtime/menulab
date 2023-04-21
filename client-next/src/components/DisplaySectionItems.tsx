import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";
import AssignToSection from "./AssignToSection";
import DeleteItem from "./DeleteItem";
import UploadFile from "./UploadFile";
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

    // Function to get image URL from Cloudinary
    const getImageUrl = (item) => {
        if (item.photo_reference) {
            return `https://res.cloudinary.com/dm4j1v9ev/image/upload/${item.photo_reference}`;
        } else {
            return "/image-placeholder.png";
        }
    };

    return (
        <Fragment>

            {(sectionItems && sectionItems.length > 0) ? (
                <div className="card-deck row row-cols-1 row-cols-md-2 g-4">

                    {sectionItems.map((item, i) => (
                        <div className="column" key={i}>
                            <div className="card h-100" >
                                <div className="card-body">
                                    <div className="containter">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="card-title">{item.name}</div>
                                                <p className="card-text">{item.price}</p>
                                                <p className="text-muted">{item.description}</p>
                                            </div>
                                            <div className="col-4">
                                                <Card.Img
                                                    variant="primary"
                                                    src={getImageUrl(item)}
                                                    className="img-fluid"
                                                    style={{
                                                        width: "200px",
                                                        height: "200px",
                                                        objectFit: "cover",
                                                        objectPosition: "center"
                                                    }}
                                                />
                                                <UploadFile item={item} />
                                            </div>
                                        </div>
                                        <div className="row">
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
        </Fragment >
    );
};

export default DisplaySectionItems;