import React, { useState } from "react";
import { useToken } from "@/lib/SessionManagement";
import Image from "next/image";

//TODO: Maybe UploadImage is a better name
function UploadFile({ item }: { item: any }) {
  const jwtToken = useToken();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

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
  
    try {
      const response = await fetch(`http://localhost:5000/dashboard/persist-image/${item.item_id}`, {
        method: "POST",
        headers: { token: jwtToken },
        body: formData,
      });
  
      const data = await response.json();
      setFileUrl(data.url);
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
