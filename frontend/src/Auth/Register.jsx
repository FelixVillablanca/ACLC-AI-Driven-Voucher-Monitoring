import { useState, useEffect } from "react";
import '../styling/styles.css';
import axios from "axios";


function RegisterForm() {
  const [ UserIP, setUserIP ] = useState('');
  const [Message, setMessage] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios.get('https://api.ipify.org?format=json')
    .then(response => {
      if (response.data.ip) {
        setUserIP(response.data.ip);
        axios.get(`${backendURL}/check-ip?ip=${response.data.ip}`)
        .then(res => {
          if (res.data.foundUser !== null) {
            if (res.data.foundUser.ip_address === response.data.ip) {
                if (res.data.foundUser.account_auth === "pending") {
                  setMessage("Your account is still pending approval. Please wait for an administrator to review your registration.");
                  window.location.href = "/pending-register";
                  // alert("Your IP address is already associated with an account. Please contact support if you believe this is an error.")
                  return
                } else {
                  window.location.href = "/register";
                  console.log('IP address already exists in the database. Redirecting to UserInterface role page.');
                  return
                }
            }
          } else if (res.data.foundUser === null) {
            console.log('IP address not found in the database. Proceeding with registration.');
            return
          }
        })
      }
    })
    .catch(error => {
      console.log("Error fetching IP address:", error)
    })
  }, [])
  console.log("User ip address:", UserIP);
  // console.log("backendURL:", backendURL);
  

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password_confirmation: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form locally
    let newErrors = {};
    if (!formData.name) newErrors.name = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.password_confirmation) newErrors.password_confirmation = "Please confirm your password";
    if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = "Passwords do not match";
    if (!formData.email) newErrors.email = "Email is required";

    setErrors(newErrors);

    // Only proceed if no validation errors
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${backendURL}/register`, formData);
        if (response.data.success === true) {
          setSuccess(response.data.message);
          setMessage("");
          console.log("User registered", response.data.user);
          // Clear form
          setFormData({
            name: "",
            password: "",
            password_confirmation: "",
            email: "",
          });
          // Uncomment to redirect after successful registration
          // setTimeout(() => window.location.href = "/login", 2000);
        }
      } catch (error) {
        setSuccess("");
        console.error("Registration error details:", error.response?.data);
        if (error.response && error.response.data.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('\n');
          setMessage(errorMessages);
        } else if (error.response && error.response.data.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An error occurred during registration. Please check your entries and try again.");
        }
      }
    }
  };

  return (
    <div className="w-full max-w-md h-auto flex flex-col items-center gap-5 rounded p-5 font-poppins bg-white shadow">
      <h1 className="text-2xl">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="relative w-full flex flex-col items-center gap-5"
      >
        {/* Username */}
        <div className="flex flex-col w-full">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 chars, uppercase, lowercase, number, special char)"
            value={formData.password}
            onChange={handleChange}
            className="border rounded p-2"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        {/* Password Confirmation */}
        <div className="flex flex-col w-full">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="border rounded p-2"
          />
          {errors.password_confirmation && (
            <span className="text-red-500 text-sm">{errors.password_confirmation}</span>
          )}
        </div>

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

        {/* Submit */}
        <input
          type="submit"
          value="Register"
          className="border bg-black rounded-2xl p-1 text-white w-60 cursor-pointer"
        />

        <small>
          Already have an account?{" "}
          <a href="/" className="text-blue-700 underline">
            Sign In
          </a>
        </small>

        {success && <div className="text-green-500 mt-2">{success}</div>}
      </form>
    </div>
  );
}

export default RegisterForm;
