import React, { useState } from "react";

interface ImageCompProps {
  onImageSelect: (file: File) => void;
}

const ImageComp: React.FC<ImageCompProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="image-upload-input"
      />
      <label htmlFor="image-upload-input" className="image-upload-label">
        Upload Image
      </label>
      {preview && <img src={preview} alt="Image Preview" className="image-preview" />}
    </div>
  );
};

export default ImageComp;
