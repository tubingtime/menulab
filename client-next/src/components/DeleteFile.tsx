import React, { useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import Image from "next/image";
import itemsReducer from "@/lib/itemsReducer";

function DeleteFile({ item, itemsDispatch }) {
    const jwtToken = useToken();
    const deleteCloudinaryImage = async (publicId) => {
        try {
            const response = await fetch(`http://localhost:5000/dashboard/api/${publicId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    token: jwtToken
                },
            });

            console.log('Image deleted successfully');
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    };

    const handleRemoveImage = async (item) => {
        try {
            if (!item.photo_reference) {
                alert('Item does not have a photo_reference to delete');
                return;
            }
            // Delete the image from Cloudinary
            await deleteCloudinaryImage(item.photo_reference);

            // Update the item in the database
            const updatedItem = { ...item, photo_reference: null };
            const response = await fetch(`http://localhost:5000/dashboard/item/${item.item_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", token: jwtToken },
                body: JSON.stringify(updatedItem)
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
                type: 'changed',
                item: changedItem
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveImage(item)}>Remove Image</button>
        </div>
    );
}

export default DeleteFile;
