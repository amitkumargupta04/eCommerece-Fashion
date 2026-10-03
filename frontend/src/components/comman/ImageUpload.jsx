import React, { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { fileService } from "@/services";
import { toast } from "react-toastify";

const ImageUpload = ({ value, onChange, label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    try {
      setUploading(true);
      const res = await fileService.uploadFile(file);
      
      const imageUrl = res?.url || res?.fileUrl || res?.data || res;

      onChange(imageUrl); 
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-400">{label}</label>

      {/* Agar pehle se Image URL hai */}
      {value ? (
        <div className="relative w-full h-40 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 group">
          <img
            src={value}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-md transition cursor-pointer"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Dropzone Upload UI */
        <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-700 hover:border-indigo-500 bg-gray-800/50 hover:bg-gray-800 rounded-xl cursor-pointer transition p-4">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
                <p className="text-xs text-gray-400">Uploading to server...</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-300 font-medium">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP, GIF up to 5MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;