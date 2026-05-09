import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      localStorage.setItem("token", data.token);

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <Link to="/" className="text-black font-semibold cursor-pointer ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
