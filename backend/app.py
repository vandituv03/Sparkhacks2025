import subprocess
from flask import Flask, redirect

app = Flask(__name__)

# Start Vite Dev Server
subprocess.Popen(["npm", "run", "dev"], cwd="frontend/")

@app.route('/')
def redirect_to_react():
    return redirect("http://localhost:5173")

if __name__ == '_main_':
    app.run(debug=True, port=5000)