import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    address1: "",
    city: "",
    state: "",
    zip: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register", formData);
      if (response.status === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        navigate("/login"); // Redirect to login after 2 seconds
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen overflow-hidden" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        margin: 0
    }}>
      <div className="w-full max-w-md p-6 glass-effect rounded-lg shadow-2xl bg-white bg-opacity-90 backdrop-blur-md" style={{
      }}>
        <h1 className="text-3xl font-bold text-green-800 text-center mb-4">Register</h1>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>First Name</label>
              <input name="fname" value={formData.fname} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label>Last Name</label>
              <input name="lname" value={formData.lname} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" value={formData.password} onChange={handleChange} type="password" required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label>Address</label>
            <input name="address1" value={formData.address1} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>City</label>
              <input name="city" value={formData.city} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label>State</label>
              <input name="state" value={formData.state} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            </div>
          </div>
          <div>
            <label>Zip Code</label>
            <input name="zip" value={formData.zip} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition duration-200">Register</button>
          <p className="text-sm text-gray-600 text-center mt-3">
            Already have an account? <button type="button" onClick={() => navigate("/login")} className="text-green-600 font-semibold">Login here</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;