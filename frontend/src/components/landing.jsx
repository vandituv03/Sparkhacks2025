import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import { Card } from "./Card.jsx";
import { LogIn } from "lucide-react";
// import { Flower2 } from 'lucide-react';

export default function About() {
    const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen min-w-screen bg-[#f0f9f0]" style={{ fontFamily: 'Poppins, sans-serif', height: "100vh", width: "100vw"}}>
      <nav className="bg-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-center">
            {/* logo centered*/ }
            <div className="flex-1 flex justify-center">
              <a href="/" className="flex items-center">
                <img src="/finalLogo.png" alt="Logo" className="h-16 w-auto md:h-20"/>
            </a>
        </div>
          <button onClick={() => navigate("/login")} className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition right: 30px ">
          <LogIn className="mr-2 h-4 w-4" /> login
        </button>
        </div>
        </nav>
      
    
      

      <div className="bg-gradient-to-b from-green-600 to-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Farmers Through Technology</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            We're on a mission to revolutionize agriculture by bringing smart solutions to every farmer's fingertips.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Our Story</h2>
          <Card className="p-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in Sparkhacks 2025, AgriMitra emerged from a simple yet powerful idea: to bridge the gap between traditional farming wisdom and modern technology. We recognized that while agriculture has been the backbone of our economy for generations, many farmers still face challenges in accessing modern resources and information.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We're excited to serve thousands of farmers across the country, providing them with smart weather updates, AI Assistance, and a supportive community platform. Our digital solutions will help reduce waste as much as possible.
            </p>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "☀️",
                title: "Smart Weather Insights",
                description: "Precise weather forecasting and alerts tailored for agricultural needs"
              },
              {
                icon: "🤖",
                title: "AI-Powered Assistant",
                description: "24/7 expert guidance for crop management and problem-solving"
              },
              {
                icon: "📈",
                title: "Supportive community platform",
                description: "Farmers can discuss the common problems they faced and share with other farmers."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl text-green-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>


        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-6">Get in Touch</h2>
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center space-x-2">
                    <span className="text-green-600">✉️</span>
                    <span>support@agrimitra.com</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-green-600">📞</span>
                    <span>+1 1234567890</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-green-600">📍</span>
                    <span>1200 W Harrison St, Chicago IL-60607</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {["facebook" , "instagram", "linkedin", "instagram"].map((social) => (
                    <Button key={social} variant="ghost" size="icon" className="text-green-600 hover:text-green-800">
                      <span className={`text-2xl bi bi-${social}`}></span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 AgriMitra. All rights reserved.</p>
        </div>
      </footer>
    </div>  
  );
}