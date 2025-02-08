// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // const LoginPage = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (!email || !password) {
//   //     alert("Please fill in all fields");
//   //     return;
//   //   }
//   //   if (!isValidEmail(email)) {
//   //     alert("Please enter a valid email address");
//   //     return;
//   //   }
//   //   console.log("Login attempt with:", { email, password });
//   //   alert("Login functionality will be integrated with backend");
//   // };

//   // const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const LoginPage = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
  
//     const handleLogin = async (e) => {
//       e.preventDefault();
  
//       try {
//         const response = await axios.post("http://127.0.0.1:5000/api/login", { username, password });
  
//         if (response.status === 200) {
//           alert(response.data.message);
//           navigate(response.data.redirect); // Redirect to /dashboard
//         }
//       } catch (error) {
//         setError("Invalid username or password");
//       }
//     };

//     const handleRegisterClick = () => {
//       navigate("/register"); // Navigate to the registration page
//     };

//   return (
//     <div className="flex items-center justify-center min-h-screen min-w-screen overflow-hidden" style={{
//       backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       height: "100vh",
//       width: "100vw",
//       margin: 0
//     }}>
//       <div className="w-full max-w-md p-6 glass-effect rounded-lg shadow-2xl bg-white bg-opacity-90 backdrop-blur-md">
//         <div className="text-center mb-6">
//         <div className="text-center mb-6">
//         <img src="/finalLogo.png" alt="Final Logo" className="h-16 mx-auto" />
//       </div>
//         </div>
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">Email Address</label>
//             <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" type="email" id="email" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="farmer@example.com" />
//           </div>
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Password</label>
//             <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
//           </div>
//           <button type="submit" className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition duration-200">Login</button>
//           <div className="text-center mt-3">
//             <p className="text-sm text-gray-600">Don't have an account? <a href="#" className="text-green-600 hover:text-green-800 font-semibold" onClick={handleRegisterClick}> Register here</a></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        alert(response.data.message);
        navigate(response.data.redirect); // Redirect to /dashboard
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the registration page
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen min-w-screen overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        margin: 0,
      }}
    >
      <div className="w-full max-w-md p-6 glass-effect rounded-lg shadow-2xl bg-white bg-opacity-90 backdrop-blur-md">
        <div className="text-center mb-6">
          <img src="/finalLogo.png" alt="Final Logo" className="h-48 mx-auto" />
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="farmer@example.com"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-800 font-semibold"
                onClick={handleRegisterClick}
              >
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
