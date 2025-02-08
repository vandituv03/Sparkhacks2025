import os
import requests
import random
import unittest
from dotenv import load_dotenv

# Load API keys from .env file
load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
WEATHERBIT_API_KEY = os.getenv("WEATHERBIT_API_KEY")

# API Base URLs
OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
WEATHERBIT_BASE_URL = "https://api.weatherbit.io/v2.0/alerts"

# Predefined farm waste reduction tips
FARM_WASTE_TIPS = [
    "Use crop residues for composting instead of burning them.",
    "Sell excess produce in local markets instead of discarding it.",
    "Use food waste to make organic fertilizers or feed for livestock.",
    "Use food scraps to make biofertilizer through composting.",
    "Convert manure into biogas for energy and reduce farm waste.",
    "Recycle used plastic seed bags and pesticide containers.",
    "Use biodegradable mulch films instead of plastic covers.",
    "Convert animal manure into biogas to generate clean energy.",
    "Use cow dung to produce organic compost or biochar."
]


def get_weather_data(city, country="US"):
    """Fetches current weather data from OpenWeatherMap API"""
    url = f"{OPENWEATHER_BASE_URL}?q={city},{country}&appid={OPENWEATHER_API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        weather_info = {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "weather": data["weather"][0]["description"],
            "wind_speed": data["wind"]["speed"]
        }
        print(f"[DEBUG] Weather Data for {city}: {weather_info}")  # Debugging print statement
        return weather_info

    print(f"[ERROR] Failed to fetch weather data for {city}. Response: {response.text}")  # Debugging print statement
    return {"error": "City not found"}

def get_weather_alerts(city, country="US"):
    """Fetches severe weather alerts from Weatherbit API"""
    url = f"{WEATHERBIT_BASE_URL}?city={city}&country={country}&key={WEATHERBIT_API_KEY}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        alerts = data.get("alerts", [])

        if not alerts:
            print(f"[DEBUG] No severe weather alerts for {city}.")  # Debugging print statement
            return {"message": f"No severe weather alerts in {city}."}

        alert_list = [
            {
                "title": alert.get("title"),
                "description": alert.get("description"),
                "severity": alert.get("severity"),
                "effective_date": alert.get("effective_local"),
                "expires_date": alert.get("expires_local"),
                "regions": alert.get("regions")
            }
            for alert in alerts
        ]

        print(f"[DEBUG] Weather Alerts for {city}: {alert_list}")  # Debugging print statement
        return {"alerts": alert_list}

    print(f"[ERROR] Failed to fetch weather alerts for {city}. Response: {response.text}")  # Debugging print statement
    return {"error": "Failed to retrieve weather alerts"}

def get_farm_tip():
    """Provides a random farm waste tip
    category = category.lower()
    if category in FARM_WASTE_TIPS:
        tip = random.choice(FARM_WASTE_TIPS[category])
        print(f"[DEBUG] Farm Tip ({category}): {tip}")  # Debugging print statement
        return tip

    print(f"[ERROR] No farm tips available for category '{category}'.")  # Debugging print statement
    return "No tips available for this category."
    """
    if FARM_WASTE_TIPS:
        return random.choice(FARM_WASTE_TIPS)
    return "No farm waste tips available."

# ====================================
# 📌 Unit Tests for dashboard.py
# ====================================
class TestDashboardFunctions(unittest.TestCase):

    def test_get_weather_data_valid_city(self):
        """Test fetching weather data for a valid city."""
        response = get_weather_data("New York")
        self.assertIn("temperature", response)
        self.assertIn("humidity", response)
        self.assertIn("weather", response)
        print("[TEST] ✅ get_weather_data valid city test passed.")

    def test_get_weather_data_invalid_city(self):
        """Test fetching weather data for an invalid city."""
        response = get_weather_data("InvalidCityName")
        self.assertIn("error", response)
        self.assertEqual(response["error"], "City not found")
        print("[TEST] ✅ get_weather_data invalid city test passed.")

    def test_get_weather_alerts_valid_city(self):
        """Test fetching weather alerts for a valid city."""
        response = get_weather_alerts("New York")
        self.assertTrue("alerts" in response or "message" in response)
        print("[TEST] ✅ get_weather_alerts valid city test passed.")

    def test_get_weather_alerts_invalid_city(self):
        """Test fetching weather alerts for an invalid city."""
        response = get_weather_alerts("InvalidCityName")
        self.assertIn("error", response)
        self.assertEqual(response["error"], "Failed to retrieve weather alerts")
        print("[TEST] ✅ get_weather_alerts invalid city test passed.")

    def test_get_farm_tip_valid_category(self):
        """Test fetching a farm tip for a valid category."""
        response = get_farm_tip()
        self.assertIsInstance(response, str)
        print("[TEST] ✅ get_farm_tip valid category test passed.")

if __name__ == "__main__":
    unittest.main()
