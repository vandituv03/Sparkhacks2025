import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";
import { ArrowUp, ArrowDown, Cloud } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [cropAdvisory, setCropAdvisory] = useState(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard") // Fetch from backend instead of OpenWeather
      .then((response) => response.json())
      .then((data) => {
        console.log("Received weather data:", data);
        setWeatherData({
          city: data.city,
          temperature: data.temperature,
          humidity: data.humidity,
          wind_speed: data.wind_speed,
        });
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);
  

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard")
      .then((response) => response.json())
      .then((data) => {
        console.log("Received weather data:", data.alerts);
        setCropAdvisory(data.alerts.alerts[0].description);
      })
      .catch((error) => console.error("Error fetching crop advisory:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/login");
    }
  };

  const handleChatClick = () => {
    navigate("/Chat");
  };

  const handleForumClick = () => {
    navigate("/Forum");
  };

  

  const styles = {
    homeIcon: {
      cursor: 'pointer',
      width: '70px',
      height: '40px'
    },
  };

  const tips = [
    "Rotate crops annually to maintain soil health and prevent soil depletion. This practice helps disrupt pest and disease cycles while promoting nutrient balance in the soil, leading to healthier and more productive crops over time.",
  
    "Water crops early in the morning to reduce evaporation and allow plants to absorb moisture efficiently. Morning watering also helps prevent fungal growth and diseases by ensuring leaves dry out quickly under sunlight, promoting healthier crop development.",
  
    "Use organic fertilizers such as compost, manure, and biochar to enhance soil fertility naturally. These fertilizers improve soil structure, increase microbial activity, and provide essential nutrients gradually, reducing the need for chemical fertilizers and promoting sustainable farming.",
  
    "Monitor weather conditions regularly to plan farming activities effectively. Understanding temperature patterns, rainfall forecasts, and wind conditions helps farmers optimize irrigation schedules, apply fertilizers at the right time, and protect crops from adverse weather conditions.",
  
    "Practice companion planting by growing mutually beneficial crops together. For example, planting basil near tomatoes can improve their flavor and repel pests, while beans fix nitrogen in the soil, benefiting leafy greens and corn.",
  
    "Implement mulching techniques to conserve soil moisture, suppress weeds, and regulate soil temperature. Organic mulches such as straw, wood chips, or dried leaves decompose over time, enriching the soil with essential nutrients.",
  
    "Use cover crops such as clover, rye, or alfalfa during off-seasons to prevent soil erosion and improve soil health. These plants add organic matter to the soil, improve water retention, and help fix nitrogen levels naturally.",
  
    "Adopt integrated pest management (IPM) techniques to control pests effectively while minimizing chemical pesticide use. Introduce natural predators like ladybugs and lacewings, use insect-repelling plants, and apply organic pest control methods when necessary.",
  
    "Test soil regularly to understand its nutrient levels, pH, and composition. Soil testing helps determine the right type and amount of fertilizers needed, ensuring optimal plant growth and preventing excessive use of chemicals.",
  
    "Harvest crops at the right time to ensure maximum yield and quality. Delaying harvest can reduce nutritional value and make crops more susceptible to pests and diseases, while early harvesting may affect taste and market value.",
  
    "Maintain farm equipment properly to ensure efficiency and longevity. Regular cleaning, lubrication, and timely repairs of tools and machinery can reduce operational costs and prevent unexpected breakdowns during critical farming seasons.",
  
    "Encourage biodiversity on the farm by planting a variety of crops, flowers, and trees. A diverse ecosystem attracts pollinators such as bees and butterflies, improves soil health, and enhances overall farm resilience against diseases and pests.",
  
    "Adopt water conservation methods such as drip irrigation and rainwater harvesting. Drip irrigation delivers water directly to plant roots, minimizing wastage, while collecting rainwater provides an additional sustainable water source during dry periods.",
  
    "Use raised beds for better drainage and soil aeration, especially in areas with heavy rainfall. Raised beds also improve root development and make it easier to manage weeds and pests.",
  
    "Train farm workers and educate them on best agricultural practices. Proper training ensures safety, efficiency, and higher productivity, leading to improved farm management and sustainability."
  ];
  

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')", height: "100vh", width: "100vw" }}>
      <div className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-6">
          <img src="/public/finalLogo.png" style={styles.homeIcon} alt="Home" onClick={() => window.location.href = '/dashboard'} />
          <nav className="hidden md:flex space-x-6">
            <button className="text-green-700 hover:text-green-900 font-medium" onClick={handleChatClick}>Chatbot</button>
            <button className="text-green-700 hover:text-green-900 font-medium" onClick={handleForumClick}>Forum</button>
          </nav>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>

      <div className="container mx-auto px-12 py-20 fixed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-green-800">Weather Forecast</CardTitle>
              <Cloud className="h-6 w-6 text-yellow-500" />
            </CardHeader>
            <CardContent className="text-gray-700">
              {weatherData ? (
                <>
                  <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                  <p>{weatherData.weather}</p>
                  <p className="mt-2">Humidity: {weatherData.humidity}%</p>
                  <p>Wind: {weatherData.wind_speed} km/h</p>
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-green-800">Severe Weather Alerts</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              {cropAdvisory ? (
                <ul className="list-disc list-inside mt-1">
                  {cropAdvisory}
                </ul>
              ) : (
                <p>Loading crop advisory data...</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">Nearest Organic Waste Recycling Centers</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <ul className="list-disc list-inside">
                <li className="mb-2">
                  <a href="https://www.lrsrecycles.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    <strong>Lakeshore Recycling Systems</strong>
                  </a><br />
                  6132 W Oakton St, Morton Grove, IL 60053<br />
                  <span className="text-gray-600">Contact: (773) 685-8811</span>
                </li>
                <li className="mb-2">
                  <a href="https://www.recyclebycity.com/chicago" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    <strong>Chicago Recycling Program</strong>
                  </a><br />
                  1000 E 73rd St, Chicago, IL 60619<br />
                  <span className="text-gray-600">Contact: 311 (City of Chicago)</span>
                </li>
                <li className="mb-2">
                  <a href="https://www.groot.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    <strong>Groot Industries Recycling</strong>
                  </a><br />
                  2500 Landmeier Rd, Elk Grove Village, IL 60007<br />
                  <span className="text-gray-600">Contact: (847) 734-6400</span>
                </li>
              </ul>
            </CardContent>
          </Card>


          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-green-800">Farming Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>{tips[currentTipIndex]}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;