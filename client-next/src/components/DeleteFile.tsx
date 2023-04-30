import React, { useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import Image from "next/image";
import itemsReducer from "@/lib/itemsReducer";
import { Button, Modal } from "react-bootstrap";

function DeleteFile({ item, itemsDispatch }) {
    const jwtToken = useToken();

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const deleteCloudinaryImage = async (publicId) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/api/${publicId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: jwtToken,
                },
            });

        } catch (error) {
            console.error("Failed to delete image:", error);
        }
    };

    const handleRemoveImage = async (item) => {
        try {
            if (!item.photo_reference) {
                return;
            }
            // Delete the image from Cloudinary
            await deleteCloudinaryImage(item.photo_reference);

            // Update the item in the database
            const updatedItem = { ...item, photo_reference: null };
            const response = await fetch(`http://localhost:5000/dashboard/item/${item.item_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(updatedItem),
            });
            const jsonData = await response.json();

            // Update the item in the state
            const changedItem = {
                item_id: item.item_id,
                description: item.description,
                name: item.name,
                price: item.price,
                photo_reference: null,
            };
            itemsDispatch({
                type: "changed",
                item: changedItem,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="d-flex align-items-center">
            <div className="flex-grow-1 me-2">
                <Button variant="danger" onClick={handleShowModal} disabled={!item.photo_reference}>
                    Remove Image
                </Button>
                <Modal show={showModal} onHide={handleCloseModal} centered className="custom-modal" size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete the image? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => handleRemoveImage(item)} disabled={!item.photo_reference}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );

}

export default DeleteFile;
