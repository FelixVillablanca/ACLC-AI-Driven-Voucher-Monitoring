import { useState } from "react";
import '../styling/styles.css';
import Footer from '../Layout/Footer';


function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate login success/failure
      if (formData.email === "test@example.com" && formData.password === "1234") {
        setSuccess("Login successful!");
        setError("");
      } else {
        setError("Invalid credentials");
        setSuccess("");
      }
    }
  };

  return (
    <div className="w-full max-w-md h-auto border p-5 flex items-center flex-col font-poppins rounded bg-white shadow">
      <img
        src="/Image/User-default-image.jpg"
        alt="User"
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
        <p>ACLC Voucher monitoring System</p>
        <h1 className="text-2xl">Login</h1>

        <form
            onSubmit={handleSubmit}
            className="relative w-full flex flex-col items-center gap-5"
        >
            {/* Email */}
            <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded p-2"
            />
            {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded p-2"
            />
            {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            </div>

            {/* Submit */}
            <input
            type="submit"
            value="Login"
            className="border bg-black rounded-2xl p-1 text-white w-60 cursor-pointer"
            />

            <small>
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-700 underline">
                Register
            </a>
            </small>

            {success && <div className="text-green-500 mt-2">{success}</div>}
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
    </div>
  );
}

export default LoginForm;
