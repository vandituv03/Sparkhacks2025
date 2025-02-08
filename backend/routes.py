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

@api_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    models.insert_user(data.get("fname"), data.get("lname"), data.get("phone"), data.get("email"), data.get("password"), data.get("address1"), data.get("city"), data.get("state"), data.get("zip"))
    return jsonify({
                "message": "Registeration successful",
                "redirect": "/dashboard"  # Redirect to dashboard after login
            }), 200


@api_routes.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({"data": dashboard_data})
