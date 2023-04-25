import React, { useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import Image from "next/image";
import { Alert } from "react-bootstrap";

function UploadFile({ item }: { item: any }) {
    const jwtToken = useToken();
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const [publicId, setPublicId] = useState<string | undefined>(item.photo_reference?.public_id);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFileUrl(reader.result as string);
            };
        }
    };

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

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        setPublicId(item.photo_reference);
        const formData = new FormData();
        formData.append("file", file);

        // Check if file type is an image
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            setErrorMessage("Please upload an image file (png, jpeg, jpg)");
            return;
        }

        try {
            // Delete the old image if there is one
            await deleteCloudinaryImage(item.photo_reference);

            // Upload the new image
            const response = await fetch(`http://localhost:5000/dashboard/persist-image/${item.item_id}`, {
                method: "POST",
                headers: { token: jwtToken },
                body: formData,
            });

            const data = await response.json();
            setFileUrl(data.url);
            setPublicId(data.public_id);
            setShowAlert(true);
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to upload file");
        }

        window.location.reload();
    };

    return (
        <div>
            <div className="d-flex align-items-center" style={{ marginBottom: "8px" }}>
                <div className="flex-grow-1 me-2">
                    <div className="input-group">
                        <input
                            type="file"
                            className="form-control"
                            id="fileInput"
                            onChange={handleFileInput}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpload}
                            disabled={!file}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    File uploaded successfully!
                </Alert>
            )}
            {errorMessage && (
                <Alert variant="danger" onClose={() => errorMessage} dismissible>
                Please upload an image file (png, jpeg, jpg)!
            </Alert>
        )}
    </div>
    );
}

export default UploadFile;
