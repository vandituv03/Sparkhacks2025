from flask import Flask
from flask_cors import CORS
from routes import api_routes

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Register API routes
app.register_blueprint(api_routes, url_prefix="/api")

if __name__ == "_main_":
    app.run(debug=True)