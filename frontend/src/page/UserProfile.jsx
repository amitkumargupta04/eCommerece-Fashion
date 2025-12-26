// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logoutUser, updateUserProfile } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  // Fetch user profile on component mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Prefill formData when user data is fetched
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.addresses?.[0] || {
          street: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
        },
      });
    }
  }, [user]);

  // Profile form submit handler
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => toast.success("Profile updated successfully"))
      .catch(() => toast.error("Failed to update profile"));
  };

  // Address change handler
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value, // React automatically updates value
      },
    });
  };

  const isAddressComplete = (address) => {
    return (
      address.street.trim() !== "" &&
      address.city.trim() !== "" &&
      address.state.trim() !== "" &&
      address.pincode.trim() !== "" &&
      address.country.trim() !== ""
    );
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());  // Redux logout, clears user state/token
    toast.success("Logged out successfully"); // Toast
    navigate("/"); // Redirect to home
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-24 px-4">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-100 p-4 rounded-lg mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Account</h2>
        <ul className="flex md:flex-col gap-2">
          <li
            className={`cursor-pointer px-3 py-2 rounded ${
              activeTab === "profile"
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
            className={`cursor-pointer px-3 py-2 rounded ${
              activeTab === "orders"
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li
            className={`cursor-pointer px-3 py-2 rounded ${
              activeTab === "address"
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("address")}
          >
            Address
          </li>
          {/* Logout */}
          <li
            className="cursor-pointer px-3 py-2 rounded hover:bg-gray-200 text-red-600"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="md:w-3/4 md:ml-6">
        {loading && <p>Loading...</p>}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleProfileSubmit}
          >
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                placeholder="Full Name"
                className="border px-3 py-2 rounded w-full"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="border px-3 py-2 rounded w-full"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone"
                className="border px-3 py-2 rounded w-full"
              />

              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition w-max"
              >
                Update Profile
              </button>
            </div>
          </form>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {user?.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <div
                  key={order._id}
                  className="border p-4 mb-4 rounded hover:shadow-md transition"
                >
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ₹{order.totalAmount}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.orderStatus}
                  </p>
                  <div className="mt-2">
                    <strong>Items:</strong>
                    <ul className="ml-4 list-disc">
                      {order.items.map((item) => (
                        <li key={item._id}>
                          {item.product.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}

        {/* Address Tab */}
        {activeTab === "address" && (
          <form
            className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(
                updateUserProfile({
                  ...formData,
                  addresses: [formData.address],
                })
              )
                .unwrap()
                .then(() => toast.success("Address saved successfully"))
                .catch(() => toast.error("Failed to save address"));
            }}
          >
            <h2 className="text-2xl font-bold md:col-span-2">Your Address</h2>

            <input
              type="text"
              name="street"
              placeholder="Street / Area"
              value={formData.address.street}
              onChange={handleAddressChange}
              className="border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleAddressChange}
              className="border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleAddressChange}
              className="border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleAddressChange}
              className="border px-3 py-2 rounded"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleAddressChange}
              className="border px-3 py-2 rounded md:col-span-2"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition md:col-span-2 w-max"
            >
              {isAddressComplete(formData.address)
                ? "Update Address"
                : "Save Address"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
