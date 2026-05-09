import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      const data = await loginUser(formData);

      //   console.log(data);
      localStorage.setItem("token", data.token);

      alert("Login Successful");

      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
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
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-black font-semibold cursor-pointer ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
