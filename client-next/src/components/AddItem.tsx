import { useToken } from "@/lib/SessionManagement";
import React, { Fragment, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UploadImage from "./UploadImage";
import { Image } from 'react-bootstrap';

// Either do <AddItem /> OR
// <AddItem menuId={menuId} />
const AddItem = (props?: { itemsDispatch, menu_id?: any }) => {
  window.bootstrap = require('bootstrap/js/dist/modal');
  const jwtToken = useToken();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo_reference, setPhotoReference] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);

    try {
      // Do POST Request
      // const itemObj = Object.fromEntries(formData.entries());
      const body = { name, description, price, photo_reference };
      console.log(body);
      const addItem = await fetch("http://localhost:5000/dashboard/item", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: jwtToken },
        body: JSON.stringify(body)
      });

      const results: { item_id: number }[] = await addItem.json();
      const item_id = results[0].item_id;
      const addedItem = {
        item_id: item_id,
        name: name,
        description: description,
        price: price,
        photo_reference: photo_reference
      }
      console.log(addedItem);

      if (props?.menu_id) {
        // Assign (do second POST request).
        const assignItem = await fetch(`http://localhost:5000/dashboard/menus/item/${item_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", token: jwtToken },
          body: JSON.stringify({ menu_id: props.menu_id })
        });
      }

      props?.itemsDispatch({
        type: 'added',
        item: addedItem
      })

      e.target.reset();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Function to get image URL from Cloudinary
  const getImageUrl = (photo_reference) => {
    if (photo_reference) {
      return `http://res.cloudinary.com/dm4j1v9ev/image/upload/${photo_reference}`;
    } else {
      return "/image-placeholder.png";
    }
  };


  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>Add Item</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="row">
              <div className="col">
                <Form.Label className="mb-0">Name</Form.Label>
                <Form.Control type="text" value={name} placeholder="Enter item name." onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col">
                <Form.Label className="mb-0">Price</Form.Label>
                <Form.Control type="text" value={price} placeholder="Enter item price." onChange={(e) => setPrice(e.target.value)} />
              </div>
            </Form.Group>
            <Form.Group className="row">
              <div className="col">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} value={description} placeholder="Optional: Enter item description." onChange={(e) => setDescription(e.target.value)} />
              </div>
            </Form.Group>

            <Form.Group className="row">
              {photo_reference &&
                <div className="col">
                  <Form.Label>Preview</Form.Label>
                  <div>
                    <Image src={getImageUrl(photo_reference)} style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      objectPosition: "center"
                    }} />
                  </div>
                </div>
              }
            </Form.Group>

            <Form.Group className="row">
              <UploadImage onUpload={(data) => {
                setPhotoReference(data.public_id);
              }} />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" onClick={handleClose}>Add</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment >
  );
};

export default AddItem;
