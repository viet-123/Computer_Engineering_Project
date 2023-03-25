from pymongo import MongoClient
from datetime import datetime
import os
import glob
import bson
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import time

"""
Using Mongodb to store Data:
My DB named "DoorLock" has two Collections:
    + Persons:  store person info.
    + Turn:     store history.
    + Flag:     store flag.
    + Users:
CONNECTING STRING FORM: "mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>/<user>?ssl=true&ssl_cert_reqs=CERT_NONE"
"""

cluster = MongoClient(
    "mongodb+srv://theeleven:GgLYZ3uEv70JkuvG@face.cly0nzp.mongodb.net/?retryWrites=true&w=majority"
)
# go to database
db = cluster["test"]

people = db["people"]
turns = db["turns"]
class Mongo:
    def clearTurn(self):
        turns.delete_many({})
        return "delete all turns"
    def clearPerson(self):
        people.delete_many({})
        return "Delete all persons"

    def getNameById(self, id):
        Fname, Lname = "", ""
        for person in people.find():
            if str(person["_id"]) == id:
                Fname, Lname = person["Fname"], person["Lname"]
        return Fname, Lname

##########################################################################################################
class Control:
    def addPerson(self, Fname, Lname, status=True):
        id = people.count_documents({})
        createAt, updateAt = datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        ), datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        newPerson = {
            "id": id,
            "Fname": Fname,
            "Lname": Lname,
            "Status": status,
            "createAt": createAt,
            "updateAt": updateAt,
            "__v": 0,
        }
        people.insert_one(newPerson)

    def addTurn(self, imgUrl, Personid, Status):
        timeEvent = datetime.now()
        if Personid == 0:
            newTurn = {
            "time": timeEvent,
            "isMasked": Status,
            "images": imgUrl,
            "createAt": timeEvent,
            "updateAt": timeEvent,
            "__v": 0
        }
        else:   
            newTurn = {
                "person": bson.ObjectId(Personid),
                "time": timeEvent,
                "isMasked": Status,
                "images": imgUrl,
                "createAt": timeEvent,
                "updateAt": timeEvent,
                "__v": 0
            }
            
        print(newTurn)
        print("ADD NEW TURN\n")
        turns.insert_one(newTurn)

    # get imgUrl
    def getImageUrl(self):
        files = glob.glob("Turn/*jpg")
        imgName = max(files, key=os.path.getctime)
        imgUrl = "Turn/" + imgName[14::]
        return str(imgUrl)
    
#--------------------------------------------------------------------------------------------------------------------------#

# Define connection string and container name
connect_str = "DefaultEndpointsProtocol=https;AccountName=test8afa;AccountKey=yGrTX7zMZbCWadHxrK5mkm9yMJ/HwGl93foZ6+eWCQwo6DHCMLCrbPJF5fDPH4gR6slgJLkdRlAE+AStq+aazw==;EndpointSuffix=core.windows.net"
container_name = ["testcontainer", "imagestorage"]

# Create the BlobServiceClient object
blob_service_client = BlobServiceClient.from_connection_string(connect_str)


class AzureDb:
    def uploadImage(self, local_path):
        # Create a ContainerClient object for the container
        container_client = blob_service_client.get_container_client(container_name[1])

        # Set the name for the blob
        blob_name = os.path.basename(local_path)

        # Create a BlobClient object for the blob
        blob_client = container_client.get_blob_client(blob_name)

        # Upload the image file to Azure Blob Storage
        with open(local_path, "rb") as data:
            blob_client.upload_blob(data, overwrite=True)

    def downloadImage(self):
        # Download new or updated blobs every 10 seconds
        #while True:
        print("Waiting image from blod ...")
        # Get a list of blobs in the container
        container_client = blob_service_client.get_container_client(container_name[0])
        blob_list = container_client.list_blobs()

        # Download any new or updated blobs to the current working directory
        local_path = os.getcwd() + "//ai-code//Dataset"
        for blob in blob_list:
            local_filename = blob.name
            local_folder = os.path.join(local_path, local_filename.split("-")[0] + "-" + local_filename.split("-")[1])
            local_filepath = os.path.join(local_folder, local_filename)
            if not os.path.exists(local_folder):
                os.mkdir(local_folder)
                
            # Check if the blob already exists locally
            if os.path.exists(local_filepath):
                # Check if the blob has been modified since it was last downloaded
                blob_client = blob_service_client.get_blob_client(container=container_name[0], blob=blob.name)
                blob_properties = blob_client.get_blob_properties()
                blob_last_modified = blob_properties.last_modified
                local_last_modified = os.path.getmtime(local_filepath)
                if blob_last_modified.timestamp() <= local_last_modified:
                    # The blob has not been modified since it was last downloaded
                    continue

            # Download the blob
            blob_client = blob_service_client.get_blob_client(container=container_name[0], blob=blob.name)
            with open(local_filepath, "wb") as my_blob:
                download_stream = blob_client.download_blob()
                my_blob.write(download_stream.readall())

            print(f"Blob {blob.name} downloaded to {local_filepath}")

            # Wait for 5 seconds before checking for new blobs again
            #time.sleep(5)
