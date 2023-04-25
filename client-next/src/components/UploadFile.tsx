import React, { useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import Image from "next/image";

function UploadFile({ item }: { item: any }) {
  const jwtToken = useToken();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [publicId, setPublicId] = useState<string | undefined>(item.photo_reference?.public_id);

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
      alert("Please select a file to upload");
      return;
    }
    setPublicId(item.photo_reference);
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

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
      alert("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload file");
    }

    window.location.reload();
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
