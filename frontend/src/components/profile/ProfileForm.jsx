import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Camera, Loader2, Save } from "lucide-react";
import { profileService } from "@/services";

function ProfileForm({ profileData, onProfileUpdated }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "MALE",
    dateOfBirth: "",
    profileImage: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Load existing profile data
  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        phoneNumber: profileData.phoneNumber || "",
        gender: profileData.gender || "MALE",
        dateOfBirth: profileData.dateOfBirth || "",
        profileImage: profileData.profileImage || profileData.avatar || "",
        address: profileData.address || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file!");
      return;
    }

    try {
      setImageUploading(true);
      const res = await profileService.updateAvatar(file);

      const newImageUrl = res?.data?.profileImageUrl;

      if (newImageUrl) {
        setFormData((prev) => ({
          ...prev,
          profileImage: newImageUrl,
        }));

        toast.success(res?.message || "Avatar updated successfully!");
        if (onProfileUpdated) {
          onProfileUpdated({ profileImage: newImageUrl });
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setImageUploading(false);
    }
  };

  // Form Submit Handler (Now Image-Free Pure Data Save)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = { ...formData };
      delete payload.profileImage;

      const response = await profileService.saveProfile(payload);
      toast.success("Profile updated successfully!");

      if (onProfileUpdated) {
        onProfileUpdated(response.data || formData);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image Avatar Section */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 pb-4 border-b border-gray-100">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
          <img
            src={
              formData.profileImage ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
            }
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
          {imageUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        <div>
          <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition inline-flex items-center gap-2">
            <Camera className="w-4 h-4" />
            {imageUploading ? "Uploading..." : "Change Avatar"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={imageUploading}
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG or GIF. Max 5MB.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit phone number"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          name="address"
          rows={3}
          value={formData.address}
          onChange={handleChange}
          placeholder="Flat / Building / Area / City"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || imageUploading}
        className="w-full sm:w-auto bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        Save Profile
      </button>
    </form>
  );
}

export default ProfileForm;
