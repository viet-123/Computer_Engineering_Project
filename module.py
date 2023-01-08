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
    "mongodb+srv://hda1010:duyanh123@cluster0.ukowb.mongodb.net/facerecognition?retryWrites=true&w=majority"
)
# go to database
db = cluster["facerecognition"]

persons = db["persons"]
turns = db["turns"]
flag = db["flags"]


class Mongo:
    def updateFlag(self):
        f = flag.find_one()
        newFlag = {"$set": {"Flagcheck": True}}
        flag.update_one(f, newFlag)

    def clearTurn(self):
        turns.delete_many({})
        return "delete all turns"

    def clearPerson(self):
        persons.delete_many({})
        return "Delete all persons"

    def getNameById(self, id):
        Fname, Lname = "", ""
        for person in persons.find():
            if str(person["_id"]) == id:
                Fname, Lname = person["Fname"], person["Lname"]
        return Fname, Lname


##########################################################################################################
class Control:
    def addPerson(self, Fname, Lname, status=True):
        id = persons.count_documents({})
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
        persons.insert_one(newPerson)

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
        files = glob.glob("..\public\img\*.png")
        imgName = max(files, key=os.path.getctime)
        imgUrl = "../img/" + imgName[14::]
        return str(imgUrl)
