import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserProfile, logoutUser } from "../services/authService";

import {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getMyRestaurant,
} from "../services/restaurantService";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location_name: "",
    image: null,
  });

  const fetchData = async () => {
    try {
      const userData = await getUserProfile();
      setUser(userData.user);

      if (userData.user.role === "restaurant") {
        try {
          const res = await getMyRestaurant();
          setRestaurant(res.restaurant);
        } catch {
          setRestaurant(null);
        }
      }
    } catch (err) {
      setUser(null);
      setRestaurant(null);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
    else {
      setUser(null);
      setRestaurant(null);
    }
  }, [isLoggedIn]);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ================= CREATE =================
  const handleCreateRestaurant = async (e) => {
    e.preventDefault();

    try {
      const dataForm = new FormData();

      dataForm.append("name", formData.name);
      dataForm.append("location_name", formData.location_name);

      if (formData.image) {
        dataForm.append("image", formData.image);
      }

      const data = await createRestaurant(dataForm);

      alert(data.message);
      setRestaurant(data.restaurant);
      setShowRestaurantForm(false);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setRestaurant(null);
    navigate("/");
  };

  return (
    <header className="shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link className="text-3xl font-bold text-orange-500">VeloxEats</Link>

          {/* NAV */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/offers">Offers</Link>
            <Link to="/help">Help</Link>

            {/* CREATE BUTTON */}
            {user?.role === "restaurant" && !restaurant && (
              <button
                onClick={() => setShowRestaurantForm(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Become Partner
              </button>
            )}

            {/* PROFILE */}
            {isLoggedIn ? (
              <div className="relative">
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={user?.image || "/placeholder.png"}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{user?.name}</span>
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border shadow rounded">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/">Login</Link>
            )}

            <Link to="/cart">Cart</Link>
          </nav>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showRestaurantForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
            <button
              onClick={() => setShowRestaurantForm(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-1">Register Restaurant</h2>

            <p className="text-sm text-gray-500 mb-5">Join partner program</p>

            <form onSubmit={handleCreateRestaurant} className="space-y-4">
              {/* NAME */}
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Restaurant Name"
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* LOCATION */}
              <input
                name="location_name"
                value={formData.location_name}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border p-3 rounded-lg"
                required
              />

              {/* IMAGE (OPTIONAL) */}
              <div>
                <label className="text-sm text-gray-600">
                  Upload Image (optional)
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full mt-1"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRestaurantForm(false)}
                  className="w-1/2 bg-gray-200 py-3 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-orange-500 text-white py-3 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
