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

  const handleAboutClick = () => {
    navigate("/AboutUS");
  };

  const styles = {
    homeIcon: {
      cursor: 'pointer',
      width: '50px',
      height: '40px'
    },
  };

  const tips = [
    "Rotate crops annually to maintain soil health.",
    "Water crops early in the morning to reduce evaporation.",
    "Use organic fertilizers for better soil fertility.",
    "Monitor weather conditions to plan farming activities effectively."
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')", height: "100vh", width: "100vw" }}>
      <div className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-6">
          <img src="/public/finalLogo.png" style={styles.homeIcon} alt="Home" onClick={() => window.location.href = '/dashboard'} />
          <nav className="hidden md:flex space-x-6">
            <button className="text-green-700 hover:text-green-900 font-medium" onClick={handleChatClick}>Chatbot</button>
            <button className="text-green-700 hover:text-green-900 font-medium" onClick={handleForumClick}>Forum</button>
            <button className="text-green-700 hover:text-green-900 font-medium" onClick={handleAboutClick}>About Us</button>
          </nav>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>

      <div className="container mx-auto px-4 py-20 fixed">
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
              <CardTitle className="text-green-800">Market Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Price/Quintal</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Rice</TableCell>
                    <TableCell>₹2,100</TableCell>
                    <TableCell>Azadpur Mandi</TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <ArrowUp className="h-4 w-4 mr-1" /> Rising
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Wheat</TableCell>
                    <TableCell>₹1,950</TableCell>
                    <TableCell>Azadpur Mandi</TableCell>
                    <TableCell className="text-red-600 flex items-center">
                      <ArrowDown className="h-4 w-4 mr-1" /> Falling
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Potato</TableCell>
                    <TableCell>₹1,200</TableCell>
                    <TableCell>Azadpur Mandi</TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <ArrowUp className="h-4 w-4 mr-1" /> Rising
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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