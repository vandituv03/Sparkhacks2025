from flask import Blueprint, jsonify, request
import models

# Dummy users data (replace with database authentication in real-world applications)
api_routes = Blueprint("api_routes", __name__)

@api_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()  # Get JSON data from frontend
    username = data.get("username")
    password = data.get("password")
    print(username, password)

    user = models.findUser(username)
    print("user", user)


    if(user):
        print("XYZ")     
        if(user["password"] == password):
            print("logging")
            return jsonify({
                "message": "Login successful"
            }), 200

    # Check credentials

    return jsonify({"message": "Invalid credentials"}), 401

@api_routes.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({"data": dashboard_data})
