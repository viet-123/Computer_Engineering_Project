"""
This function will open webcam and start capture front_face's user
"""
import cv2
import os
import pymongo
from module import persons, Control
import time

def newPerson():
    Fname = str(input("Type your first name: "))
    Lname = str(input("Type your last name: "))
    Control.addPerson("", Fname, Lname, True)
    id = persons.find().sort("_id", pymongo.DESCENDING).limit(1)[0]["_id"]
    # creater new directory in user_capture
    os.makedirs("./images/" + str(id))
    return "Adding {} to dataset".format(Fname + Lname), str(id)


def storeUserImage():
    msg, newDataSet = newPerson()
    print(msg)
    print("Start create dataset...")
    face_cascade = cv2.CascadeClassifier(
        "./cascades/data/haarcascade_frontalface_alt.xml"
    )
    video = cv2.VideoCapture(0)
    count = 0
    count_shot = 10
    while True:
        check, data = video.read()
        faces = face_cascade.detectMultiScale(data, scaleFactor=1.5, minNeighbors=5)
        for x, y, w, h in faces:
            cv2.rectangle(data, (x, y), (x + w, y + h), (0, 255, 0), 3)
            if count_shot == 0:
                cv2.imwrite("./images/" + newDataSet + "/" + str(count) + ".jpg", data)
                count += 1
                count_shot = 10
            count_shot = count_shot - 1
        cv2.waitKey(3)
        cv2.imshow("Face Detect", data)
        key = cv2.waitKey(1)

        # Press 'q' to exit
        if key == ord("q") or count == 30:
            break
    print("added!")
    # Release memory
    video.release()


storeUserImage()
cv2.destroyAllWindows()