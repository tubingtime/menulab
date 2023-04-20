import React, { Fragment, useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


const EditItem = ({item, itemsDispatch}) => {

    window.bootstrap = require('bootstrap/js/dist/modal');
    const jwtToken = useToken();
    

    const [description, setDescription] = useState(item.description);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateItem = async e => {
        e.preventDefault();
        try {
            const body = { name, description, price };

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
                price: price
            };

            itemsDispatch({
                type: 'changed',
                item: changedItem
            });

        } catch (err: any) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <Button variant="outline-info" size="sm" onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="row">
                            <div className="col">
                                <Form.Label className="mb-0">Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="col">
                                <Form.Label className="mb-0">Price</Form.Label>
                                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <div className="col">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <div className="col">
                                <input type="file" className="form-control mt-3" id="customFile" />
                            </div>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-info" onClick={(e) => updateItem(e)}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => { handleClose(); setDescription(item.description); }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default EditItem;
