import React, { useState } from "react";

import { updateUserRole } from "../../services/adminService";

const ProvideAuthority = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateUserRole(userId, role);

      alert(data.message);

      setUserId("");
      setRole("customer");
    } catch (error) {
      console.log(error.message);

      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
          Provide Authority
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User ID */}
          <div>
            <label className="block mb-2 font-medium">User ID</label>

            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 font-medium">Select Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500"
            >
              <option value="customer">Customer</option>
              <option value="restaurant">Restaurant</option>
              <option value="delivery_agent">Delivery Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Update Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProvideAuthority;
