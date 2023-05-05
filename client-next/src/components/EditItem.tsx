import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UploadImage from "./UploadImage";
import DeleteFile from "./DeleteFile";
import { Image } from 'react-bootstrap';

const EditItem = ({ item, itemsDispatch }) => {

    window.bootstrap = require('bootstrap/js/dist/modal');
    const jwtToken = useToken();


    const [description, setDescription] = useState(item.description);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [photo_reference, setPhotoReference] = useState(item.photo_reference);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateItem = async e => {
        e.preventDefault();
        try {
            const body = { name, description, price, photo_reference };

            const response = await fetch(
                `http://localhost:5000/dashboard/item/${item.item_id}`,
                {
                    method: "PUT",
                    headers: { token: jwtToken, "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            const changedItem = {
                item_id: item.item_id,
                description: description,
                name: name,
                price: price,
                photo_reference: photo_reference,
            };

            itemsDispatch({
                type: 'changed',
                item: changedItem
            });

        } catch (err: any) {
            console.error(err.message);
        }
    }

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
            <Button variant="outline-info" size="sm" onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="mb-0">Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-2 mb-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group >
                        <Form.Group className="mt-2 mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} placeholder="Optional: Enter item description." onChange={(e) => setDescription(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="row" style={{ marginBottom: "8px" }}>
                            <Form.Label>Image Preview</Form.Label>
                            {photo_reference ? (
                                <div className="col">
                                    <div>
                                        <Image src={getImageUrl(item)} alt="item" style={{
                                            width: "200px",
                                            height: "200px",
                                            objectFit: "cover",
                                            objectPosition: "center"
                                        }} />
                                    </div>
                                </div>
                            ) : (
                                <div className="col">
                                    <div>
                                        <Image src="/image-placeholder.png" alt="Image Placeholder" style={{
                                            width: "200px",
                                            height: "200px",
                                            objectFit: "cover",
                                            objectPosition: "center"
                                        }} />

                                    </div>
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group className="row" style={{ marginBottom: "8px" }}>
                            <DeleteFile item={item}
                                itemsDispatch={itemsDispatch}
                            /></Form.Group>
                        <Form.Group className="row">
                            <UploadImage onUpload={(data) => {
                                setPhotoReference(data.public_id);
                                itemsDispatch({
                                    type: "changed",
                                    item: {
                                        ...item,
                                        photo_reference: data.public_id,
                                    },
                                });

                            }} />
                            <Form.Text id="photoHelpBlock" muted>
                                Optional: Attach a png, jpeg, jpg file.
                            </Form.Text>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={(e) => updateItem(e)}>Save Changes</Button>
                    <Button variant="outline-danger" onClick={() => { handleClose(); setDescription(item.description); }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment >
    );
};

export default EditItem;
