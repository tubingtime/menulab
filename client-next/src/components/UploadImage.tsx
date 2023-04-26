import React, { useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import { Alert } from "react-bootstrap";

// Optionally take in an item
// (1) Handle file input.
// (2) Handle the upload.
// (3) If the item exists, get the cloudinary image id and delete the image from cloudinary.
// (4) If the item exists, update the photo reference in the db.
// (5) If the item doesn't exist, add the item with the image to db.

////////No
// Upload should be separate from AddItem.
// A successful upload should return the photo_reference.

function UploadImage(props: {
  onUpload: (data: any) => void,
}) {
  const jwtToken = useToken();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [publicId, setPublicId] = useState<any>(undefined);
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

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        const formData = new FormData();
        const image_id = formData.get("public_id");
        setPublicId(image_id);
        formData.append("file", file);

        // Check if file type is an image
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || "null";
        if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            setErrorMessage("Please upload an image file (png, jpeg, jpg)");
            return;
        }

        try {
            // Upload the new image
            const response = await fetch(`http://localhost:5000/dashboard/upload`, {
                method: "POST",
                headers: { token: jwtToken },
                body: formData,
            });

            const data = await response.json();
            setFileUrl(data.url);
            setPublicId(data.public_id);
            props.onUpload(data);
            setShowAlert(true);
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to upload file");
        }

        // window.location.reload();
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

export default UploadImage;
