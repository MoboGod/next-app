"use client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import React, { useState } from "react";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <div>
      {publicId && (
        <CldImage src={publicId} width={260} height={160} alt="something" />
      )}
      <CldUploadWidget
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
        }}
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
        uploadPreset="olmwizll"
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload Image
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadPage;
