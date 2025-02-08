from flask import Blueprint, jsonify, request
import models
from flask_cors import CORS  # Allow frontend to access the backend
from dashboard import get_weather_data, get_weather_alerts  # Ensure correct imports

api_routes = Blueprint("api_routes", __name__)
curr_user = {}

@api_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json() 
    username = data.get("username")
    password = data.get("password")
    print(username, password)

    user = models.findUser(username)
    print("user", user)


    if(user):
        print("XYZ")     
        if(user["password"] == password):
            print("logging")
            curr_user = user
            return jsonify({
                "message": "Login successful",
                "redirect": "/dashboard"
            }), 200

    return jsonify({"message": "Invalid credentials"}), 401

@api_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    models.insert_user(data.get("fname"), data.get("lname"), data.get("phone"), data.get("email"), data.get("password"), data.get("address1"), data.get("city"), data.get("state"), data.get("zip"))
    return jsonify({
                "message": "Registeration successful",
                "redirect": "/dashboard"  
            }), 200


@api_routes.route("/dashboard", methods=["GET"])
def dashboard():
    """Fetches weather, alerts, and a random farm waste tip"""

    # Fetch the city from curr_user
    city = curr_user.get("city", "Chicago")  # Default to "New York" if missing
    country = curr_user.get("country", "US")  # Default country as "US"
    print(city, country)

    print(f"[INFO] Fetching dashboard data for city: {city}, country: {country}")  # Debugging print

    weather_data = get_weather_data(city, country)
    weather_alerts = get_weather_alerts(city, country)
    # farm_tip = get_farm_tip()  # Returns one random tip

    return jsonify({
        "city": city,
        "alerts": weather_alerts,
        "temperature": weather_data["temperature"],  
        "humidity": weather_data["humidity"],        
        "wind_speed": weather_data["wind_speed"]     
        # "farm_tip": farm_tip  # Directly returning a string tip
    })

# Enable CORS to allow frontend requests
CORS(api_routes)



@api_routes.route("/chat")
def chat():
    return jsonify({"data": chat_data})
