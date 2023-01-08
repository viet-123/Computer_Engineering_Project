from pymongo import MongoClient
from datetime import datetime
import os
import glob

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
db = cluster["Face"]

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

    def addTurn(self, imgUrl, Personid, __v, Status=True, Response=False):
        timeEvent = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        newTurn = {
            "urlimg": imgUrl,
            "Status": Status,
            "Personid": Personid,
            "createAt": timeEvent,
            "__v": __v,
        }
        turns.insert_one(newTurn)

    # get imgUrl
    def getImageUrl(self):
        files = glob.glob("Turn/*jpg")
        imgName = max(files, key=os.path.getctime)
        imgUrl = "Turn/" + imgName[14::]
        return str(imgUrl)
