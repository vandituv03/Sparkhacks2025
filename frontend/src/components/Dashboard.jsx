import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TreePine, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";
import { ArrowUp, ArrowDown, Cloud, Flower2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=your_city&appid=your_api_key&units=metric") 
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({
          temperature: data.main.temp,
          weather: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      navigate("/login");
    }
  };
  const handleChatClick = () => {
    navigate("/chat")
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')", height: "100vh", width: "100vw" }}>
      
      {/* Horizontal Ribbon - Top Navigation Bar */}
      <div className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-6">
          <TreePine className="text-green-600 h-8 w-8" />
          <span className="text-2xl font-bold text-green-800">AgriMitra</span>
          <nav className="hidden md:flex space-x-6">
            <button className="text-green-700 hover:text-green-900 font-medium" onClick={handleChatClick}>Chatbot</button>
            <button className="text-green-700 hover:text-green-900 font-medium">Crop Guide</button>
            <button className="text-green-700 hover:text-green-900 font-medium">Market Prices</button>
            <button className="text-green-700 hover:text-green-900 font-medium">Weather</button>
          </nav>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>

      {/* Content Area - Adding padding-top to prevent overlap */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Weather Forecast Card */}
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
                  <p>Wind: {weatherData.windSpeed} km/h</p>
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </CardContent>
          </Card>

          {/* Crop Advisory Card */}
          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-green-800">Crop Advisory</CardTitle>
              <Flower2 className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent className="text-gray-700">
              <p className="font-medium">Current Season: Rabi</p>
              <p className="mt-2">Recommended Crops:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Wheat</li>
                <li>Mustard</li>
                <li>Potato</li>
              </ul>
            </CardContent>
          </Card>

        </div>

        {/* Market Prices Table */}
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
      </div>
    </div>
  );
};

export default Dashboard;
