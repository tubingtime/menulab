import React, { useState } from "react";
import { useToken } from "@/lib/SessionManagement";

// Optionally take in an item
// (1) Handle file input.
// (2) Handle the upload.
// (3) If the item exists, get the cloudinary image id and delete the image from cloudinary.
// (4) If the item exists, update the photo reference in the db.
// (5) If the item doesn't exist, add the item with the image to db.

////////No
// Upload should be separate from AddItem.
// A successful upload should return the photo_reference.

function UploadFile(props: {
  onUpload: (data: any) => void,
}) {
  const jwtToken = useToken();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [publicId, setPublicId] = useState<any>(undefined);

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
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const image_id = formData.get("public_id");
    setPublicId(image_id);

    try {
      const response = await fetch(`http://localhost:5000/dashboard/upload`, {
        method: "POST",
        headers: { token: jwtToken },
        body: formData,
      });

      const data = await response.json();
      setFileUrl(data.url);
      setPublicId(data.public_id);
      props.onUpload(data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file");
    }

    // window.location.reload();
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button type="button" onClick={() => handleUpload()}>
        Upload
      </button>
    </div>
  );
}

export default UploadFile;
