// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    addresses: [],
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        addresses: user.addresses || [],
      });
    }
  }, [user]);

  const handleChange = (e, index, field) => {
    if (field === "address") {
      const newAddresses = [...formData.addresses];
      newAddresses[index][e.target.name] = e.target.value;
      setFormData({ ...formData, addresses: newAddresses });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => toast.success("Profile updated successfully"))
      .catch(() => toast.error("Failed to update profile"));
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-24 px-4">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-100 p-4 rounded-lg mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Account</h2>
        <ul className="flex md:flex-col gap-2">
          <li
            className={`cursor-pointer px-3 py-2 rounded ${
              activeTab === "profile" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
            className={`cursor-pointer px-3 py-2 rounded ${
              activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li
            className={`cursor-pointer px-3 py-2 rounded ${
              activeTab === "address" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("address")}
          >
            Address
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="md:w-3/4 md:ml-6">
        {loading && <p>Loading...</p>}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleProfileSubmit}>
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border px-3 py-2 rounded w-full"
              />
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
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
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>
            {formData.addresses.length > 0 ? (
              formData.addresses.map((addr, index) => (
                <div key={index} className="border p-4 rounded">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={addr.street}
                    onChange={(e) => handleChange(e, index, "address")}
                    className="border px-2 py-1 rounded w-full mb-1"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={addr.city}
                    onChange={(e) => handleChange(e, index, "address")}
                    className="border px-2 py-1 rounded w-full mb-1"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={addr.state}
                    onChange={(e) => handleChange(e, index, "address")}
                    className="border px-2 py-1 rounded w-full mb-1"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={addr.pincode}
                    onChange={(e) => handleChange(e, index, "address")}
                    className="border px-2 py-1 rounded w-full mb-1"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={addr.country}
                    onChange={(e) => handleChange(e, index, "address")}
                    className="border px-2 py-1 rounded w-full mb-1"
                  />
                </div>
              ))
            ) : (
              <p>No addresses found.</p>
            )}
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  addresses: [...formData.addresses, {}],
                })
              }
              className="bg-blue-500 text-white px-3 py-2 rounded w-max mt-2"
            >
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
