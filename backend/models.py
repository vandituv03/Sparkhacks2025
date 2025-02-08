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
    print("Connected to the database")

except Exception as e:
    print(e)

data = db.Users.find()

def get_forums():
    data_forums = []
    for i in db.forums.find():
        data_forums.append(i)
    return data_forums



def findUser(email):

    for user in data:
        if user["email"] == email:
            return user

def insert_user(fname, lname, number, email, password, address1, city, state, zip):
    user_data = {
        "fname": fname,
        "lname": lname,
        "phone": number,
        "email": email,  # Primary Key
        "password": password,
        "address1": address1,
        "city": city,
        "state": state,
        "zip": zip
    }
    users_collection.insert_one(user_data)
    print("User inserted successfully!")



      