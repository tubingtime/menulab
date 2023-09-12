import React, { Fragment, useState, useContext } from "react";
import { useToken } from "@/lib/SessionManagement";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MenusDispatchContext } from "@/lib/menusContext";

const EditMenuName = ({ menu }) => {
    window.bootstrap = require('bootstrap/js/dist/modal');
    const jwtToken = useToken();

    const dispatch = useContext(MenusDispatchContext);

    const [name, setName] = useState(menu.name);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateName = async e => {
        e.preventDefault();
        try {
            const body = { name };
            const response = await fetch(
                `http://localhost:5000/dashboard/menu/${menu.menu_id}`,
                {
                    method: "PUT",
                    headers: { token: jwtToken, "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            const changedMenu = {
                menu_id: menu.menu_id,
                name: name
            };

            dispatch({
                type: 'changed',
                menu: changedMenu
            });

        } catch (err: any) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            <Button variant="link" onClick={handleShow} style={{ textDecoration: 'none', color: 'black' }}>{name}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Name</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => updateName(e)}>
                    <Modal.Body>
                        <Form.Group className="row">
                            <div className="col">
                                <Form.Label className="mb-0">Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" type="submit" onClick={handleClose}>Save Changes</Button>
                        <Button variant="outline-danger" type="reset" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Fragment >
    );
};

export default EditMenuName;
