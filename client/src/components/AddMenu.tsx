import { useToken } from "@/lib/SessionManagement";
import React, { useState, Fragment, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MenusDispatchContext } from "@/lib/menusContext";

// Either do <AddMenu /> OR
// <AddMenu menuId={menuId} />
const AddMenu = (props?: { menu_id?: any }) => {
    window.bootstrap = require('bootstrap/js/dist/modal');
    const jwtToken = useToken();
    const [name, setName] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useContext(MenusDispatchContext);

    const handleAddMenu = async (e) => {
        e.preventDefault();

        try {
            const body = { name };
            const addMenu = await fetch("http://localhost:5000/dashboard/menus", {
                method: "POST",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(body)
            });

            const results: { menu_id: number }[] = await addMenu.json();
            const addedMenu = {
                menu_id: results[0].menu_id,
                name: name
            };

            dispatch({
                type: 'added',
                menu: addedMenu,
            })

            e.target.reset();
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <Button variant="primary" onClick={handleShow}>Add Menu</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Menu</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleAddMenu(e)}> {/* Allow user to press enter*/}
                    <Modal.Body>
                        <Form.Group className="row">
                            <div className="col">
                                <Form.Control placeholder="Enter menu name." type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' variant="primary" onClick={handleClose} disabled={!name}>Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Fragment>

    );
};

export default AddMenu;
