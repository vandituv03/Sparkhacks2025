from flask import Blueprint, jsonify, request

api_routes = Blueprint("api_routes", __name__)

# Dummy users data (replace with database authentication in real-world applications)
users = [
    {"id": 1, "name": "Alice", "username": "alice123", "password": "password1"},
    {"id": 2, "name": "Bob", "username": "bob456", "password": "password2"}
]

dashboard_data = [
    {"id": 101, "metric": "Revenue", "value": "$100K"},
    {"id": 102, "metric": "Users", "value": "5000"}
]

@api_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()  # Get JSON data from frontend
    username = data.get("username")
    password = data.get("password")
    print(data)

    # Check credentials
    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({
                "message": "Login successful",
                "user": {"id": user["id"], "name": user["name"]},
                "redirect": "/dashboard"  # Redirect to dashboard after login
            }), 200
    
    return jsonify({"message": "Invalid credentials"}), 401

@api_routes.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({"data": dashboard_data})