from flask import Blueprint, jsonify, request
import models
from flask_cors import CORS  # Allow frontend to access the backend
from dashboard import get_weather_data, get_weather_alerts  # Ensure correct imports
from datetime import datetime


api_routes = Blueprint("api_routes", __name__)
curr_user = dict()
#CORS(api_routes)


api_routes = Blueprint("api_routes", __name__)
CORS(api_routes, supports_credentials=True)  # ✅ Allow CORS globally with credentials


def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

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
            curr_user = dict.copy(user)
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


@api_routes.route("/forum", methods=["GET"])
def get_forum_posts():
    """Fetch all forum posts using get_forums() from models.py"""
    try:
        posts = models.get_forums()  # Fetch forum posts from database
        print("Fetched Posts:", posts)  # Debugging print

        # Convert ObjectId to string for JSON serialization
        for post in posts:
            post["_id"] = str(post["_id"])  # Convert MongoDB ObjectId to string

        return jsonify(posts)  # Ensure Flask returns JSON-serializable data
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @api_routes.route("/forum", methods=["POST"])
# def create_forum_post():
#     """Create a new forum post in MongoDB"""
#     data = request.get_json()
#     print("Received Data:", data)

#     # Ensure required fields exist
#     if not data.get("email") or not data.get("title") or not data.get("desc"):
#         return jsonify({"error": "Email, title, and description are required"}), 400

#     email = data["email"]
#     title = data["title"]
#     desc = data["desc"]

#     # Fetch user details from the database
#     user = models.findUser(email)
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     # Create new forum post data
#     new_post = {
#         "title": title,
#         "desc": desc,
#         "email": email,
#     }

#     print("New Post:", new_post)  # Debugging print

#     # Insert new post into MongoDB
#     insert_result = models.insert_forums(email, title, desc)


#     if insert_result:
#         return jsonify({"message": "Post created successfully!", "post_id": str(insert_result)}), 201
#     else:
#         return jsonify({"error": "Failed to create post"}), 500

@api_routes.route("/forum", methods=["POST"])
def create_forum_post():
    """Create a new forum post in MongoDB"""
    data = request.get_json()
    print("Received Data:", data)  # Debugging print

    # Ensure required fields exist
    if not data or "email" not in data or "title" not in data or "desc" not in data:
        return jsonify({"error": "Email, title, and description are required"}), 400

    email = data["email"]
    title = data["title"]
    desc = data["desc"]

    # Fetch user details from the database
    user = models.findUser(email)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Create new forum post data
    new_post = {
        "title": title,
        "desc": desc,
        "fname": user["fname"],
        "lname": user["lname"],
        "email": email,
        "created_at": datetime.utcnow()
    }

    print("New Post:", new_post)  # Debugging print

    # Insert new post into MongoDB
    insert_result = models.insert_forums(new_post)

    if insert_result:
        return jsonify({"message": "Post created successfully!", "post_id": str(insert_result)}), 201
    else:
        return jsonify({"error": "Failed to create post"}), 500
