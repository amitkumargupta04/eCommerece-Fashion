import React, { useState, useEffect } from "react";
import { User, KeyRound, Loader2 } from "lucide-react";
import { profileService } from "@/services";
import ProfileForm from "../../components/profile/ProfileForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await profileService.getMyProfile();
        setProfileData(res.data || res); 
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const handleProfileUpdated = (updatedData) => {
    setProfileData((prev) => ({
      ...prev,          
      ...updatedData,    
    }));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 py-3 px-4 font-medium text-sm border-b-2 transition ${
            activeTab === "profile"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <User className="w-4 h-4" />
          Edit Profile
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 py-3 px-4 font-medium text-sm border-b-2 transition ${
            activeTab === "security"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          Change Password
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {activeTab === "profile" && (
          <ProfileForm
            profileData={profileData}
            onProfileUpdated={handleProfileUpdated} 
          />
        )}

        {activeTab === "security" && <ChangePasswordForm />}
      </div>
    </div>
  );
}

export default Profile;