import React, { Fragment, useState, useEffect } from "react";
import { useToken } from "@/lib/SessionManagement";
import EditItem from "@/components/EditItem";
import AssignToSection from "./AssignToSection";
import DeleteItem from "./DeleteItem";
import UploadFile from "./UploadFile";
import UploadImage from "./UploadImage";
import Image from 'next/image'
import { IncomingMessage } from "http";
import { Card } from "react-bootstrap";
import itemsReducer from "@/lib/itemsReducer";
import DeleteFile from "./DeleteFile";

const DisplaySectionItems = ({ section_id, sections, itemsDispatch, items }) => {

    const jwtToken = useToken();
    const [sectionItemIDs, setSectionItemIDs] = useState(new Set<string>());

    const getSectionItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/section/${section_id}`, {
                method: "GET",
                headers: { token: jwtToken }
            });

            const jsonData = await response.json();
            const sectionIdSet = new Set<string>();
            jsonData.map((item) => {
                sectionIdSet.add(item.item_id);
            })
            setSectionItemIDs(sectionIdSet);
        } catch (err: any) {
            console.error(err.message);
        };
    }

    useEffect(() => {
        getSectionItems();
    }, []);


    // Function to get image URL from Cloudinary
    const getImageUrl = (item) => {
        if (item.photo_reference) {
            return `http://res.cloudinary.com/dm4j1v9ev/image/upload/${item.photo_reference}`;
        } else {
            return "/image-placeholder.png";
        }
    };

    return (
        <Fragment>
            {(sectionItemIDs.size > 0) ? (
                <div className="card-deck row row-cols-1 row-cols-md-2 g-4">

                    {items.map((item) => (
                        (sectionItemIDs.has(item.item_id)) &&
                        <div className="column" key={item.item_id}>
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

                                                <UploadImage onUpload={(data) => {
                                                    itemsDispatch({
                                                        type: "changed",
                                                        item: {
                                                            ...item,
                                                            photo_reference: data.public_id,
                                                        },
                                                    });
                                                }} />
                                                <DeleteFile item={item}
                                                    itemsDispatch={itemsDispatch}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <AssignToSection item={item} sections={sections} />
                                                <EditItem item={item} itemsDispatch={itemsDispatch} />
                                                <DeleteItem
                                                    item={item}
                                                    itemsDispatch={itemsDispatch}
                                                />
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
