from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri = "mongodb+srv://SparkHacks2025:1234@cluster0.88tn1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["SparkHacks"]
users_collection = db["Users"]  

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    

except Exception as e:
    print(e)

data = db.Users.find()


def findUser(email):

    for user in data:
        if user["email"] == email:
            return user




      