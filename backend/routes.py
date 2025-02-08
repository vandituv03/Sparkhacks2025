from flask import Blueprint, jsonify, request
import models

api_routes = Blueprint("api_routes", __name__)

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
    return jsonify({"data": dashboard_data})

@api_routes.route("/chat")
def chat():
    return jsonify({"data": chat_data})
