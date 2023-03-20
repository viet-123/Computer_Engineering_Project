import cv2
import face_recognition
import shutil
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import time
from module import *

img_path = os.getcwd() + "//ai-code//Dataset"

personID = []
images = []
class_names = []
encode_list = []
encode_list_cl = []
myList = os.listdir(img_path)

    

def retrain():
    for subdir in os.listdir(img_path):
        path = img_path + '/' + subdir
        path = path + '/'
        person = "Known/{}".format(subdir)
        try:
            shutil.rmtree(os.getcwd() + "//ai-code//" + person)
        except:
            print()
        os.mkdir(os.getcwd() + "//ai-code//" + person)
        count = 1
        username = subdir.split("-")[0]
        id = subdir.split("-")[1]
        class_names.append(username)
        personID.append(id)
        for img in os.listdir(path):
            img_pic = path + img
            cur_img = cv2.imread(img_pic)
            faceLoc = face_recognition.face_locations(cur_img)[0]
            y1, x2, y2, x1 = faceLoc
            
            
            img_name = person + "/{}_{}".format(username, count) + ".png"
            cv2.imwrite(os.getcwd() + "//ai-code//" + img_name, cur_img[y1:y2, x1:x2])
            print("{} written!".format(img_name))
            count += 1
            
            cur_img = cv2.cvtColor(cur_img, cv2.COLOR_BGR2RGB)
            images.append(cur_img)

def detect_and_predict_mask(frame, faceNet, maskNet, threshold):
    # grab the dimensions of the frame and then construct a blob
    # from it
    global detections
    (h, w) = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104.0, 177.0, 123.0))
    # pass the blob through the network and obtain the face detections
    faceNet.setInput(blob)
    detections = faceNet.forward()

    # initialize our list of faces, their corresponding locations,
    # and the list of predictions from our face mask network
    faces = []
    locs = []
    preds = []
    # loop over the detections
    for i in range(0, detections.shape[2]):
        # extract the confidence (i.e., probability) associated with
        confidence = detections[0, 0, i, 2]

        # filter out weak detections by ensuring the confidence is
        # greater than the minimum confidence
        if confidence > threshold:
            # compute the (x, y)-coordinates of the bounding box for
            # the object
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")

            # ensure the bounding boxes fall within the dimensions of
            # the frame
            (startX, startY) = (max(0, startX), max(0, startY))
            (endX, endY) = (min(w - 1, endX), min(h - 1, endY))

            # extract the face ROI, convert it from BGR to RGB channel
            # ordering, resize it to 224x224, and preprocess it
            face = frame[startY:endY, startX:endX]
            face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
            face = cv2.resize(face, (224, 224))
            face = img_to_array(face)
            face = preprocess_input(face)
            face = np.expand_dims(face, axis=0)

            # add the face and bounding boxes to their respective
            # lists
            locs.append((startX, startY, endX, endY))
            # print(maskNet.predict(face)[0].tolist())
            preds.append(maskNet.predict(face)[0].tolist())
    return (locs, preds)


# SETTINGS
MASK_MODEL_PATH = os.getcwd() + "//ai-code//masksdetection-master//model//mask_model.h5"
FACE_MODEL_PATH = os.getcwd() + "//ai-code//masksdetection-master//face_detector"
THRESHOLD = 0.5

from os.path import dirname, join

protoPath = join(dirname(__file__), "deploy.prototxt")
weightsPath = join(dirname(__file__), "res10_300x300_ssd_iter_140000.caffemodel")
# load our serialized face detector model from disk
print("[INFO] loading face detector model...")
faceNet = cv2.dnn.readNet(protoPath, weightsPath)

# load the face mask detector model from disk
print("[INFO] loading face mask detector model...")
maskNet = load_model(MASK_MODEL_PATH)

# initialize the video stream and allow the camera sensor to warm up
print("[INFO] starting video stream...")
vs = cv2.VideoCapture(0)
time.sleep(2.0)

def find_encodings(images):
    # for names in images :
    for img in images:
        encodings = face_recognition.face_encodings(img)[0]
        encode_list.append(encodings)
    return encode_list


turn_counter = 0
unknown_counter = 0
arr = []
arrU = []
lastName = ""
curName = ""
retrain()
encodeListKnown = find_encodings(images)
while True:
    key = cv2.waitKey(1) & 0xFF
    success, img = vs.read()
    if key == ord('q'):
        break
    else:
        try:
            # img = imutils.resize(img, width=800)
            imgs = cv2.resize(img, (0, 0), None, 0.25, 0.25)
            imgs = cv2.cvtColor(imgs, cv2.COLOR_BGR2RGB)
            (locs, preds) = detect_and_predict_mask(imgs, faceNet, maskNet, THRESHOLD)
            facesCurFrame = face_recognition.face_locations(imgs)
            encodeCurFrame = face_recognition.face_encodings(imgs)

            for encodeFace, faceLoc, pred in zip(encodeCurFrame, facesCurFrame, preds):
                (mask, withoutMask) = pred
                label = "Mask" if mask > withoutMask else "No Mask"
                color = (0, 255, 0) if label == "Mask" else (0, 0, 255)
                label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

                matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
                faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
                matchIndex = np.argmin(faceDis)
                if faceDis[matchIndex] < 0.5:
                    name = class_names[matchIndex].upper()
                else:
                    name = "Unknown"

                y1, x2, y2, x1 = faceLoc
                y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
                curName = name
                print(lastName + "-----" + curName)
                if lastName != curName and (turn_counter >= 15 or unknown_counter >= 15):
                    turn_counter = 0
                    unknown_counter = 0

                if name == "Unknown":
                    unknown_counter += 1
                    if(unknown_counter % 5 == 0) and (unknown_counter <= 15):
                        lastName = name
                        img_name = "frontend/public/Unknown/unknown_" + datetime.now().strftime(
                            "%Y%m%d%H%M%S") + ".jpg"
                        img_name1 = "Unknown/unknown_" + datetime.now().strftime(
                            "%Y%m%d%H%M%S") + ".jpg"
                        cv2.imwrite(img_name, img[y1:y2, x1:x2])
                        print("{} written!".format(img_name))
                        arrU.append(img_name1)
                        isMasked = (True if label == "Mask" else False)
                        if unknown_counter == 15:
                            Control.addTurn("", arrU, 0, isMasked)
                            arrU.clear()
                else:
                    turn_counter += 1
                    if (turn_counter % 5 == 0) and (turn_counter <= 15):
                        lastName = name
                        img_name = "frontend/public/Turn/{}_".format(name) + datetime.now().strftime(
                            "%Y%m%d%H%M%S") + ".jpg"
                        img_name1 = "Turn/{}_".format(name) + datetime.now().strftime(
                            "%Y%m%d%H%M%S") + ".jpg"
                        cv2.imwrite(img_name, img[y1:y2, x1:x2])
                        print("{} written!".format(img_name))
                        isMasked = (True if label == "Mask" else False)
                        arr.append(img_name1)
                        
                        if turn_counter == 15:
                            for id, personName in zip(personID, class_names):
                                if(personName == name):
                                    Control.addTurn("", arr, id, isMasked)
                                    arr.clear()

                cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
                cv2.rectangle(img, (x1, y2 - 35), (x2, y2), color, cv2.FILLED)
                cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
                cv2.putText(img, label, (x1, y2 + 10), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 2)
        except:
            print("")

    cv2.imshow('Project', img)

vs.release()
cv2.destroyAllWindows()
