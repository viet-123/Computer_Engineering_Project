import cv2
import face_recognition
import shutil
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import os
import time
from datetime import datetime

img_path = os.getcwd() + "//dataset"

images = []
class_names = []
encode_list = []
encode_list_cl = []
myList = os.listdir(img_path)

personID = ["63ba69cf61b7276ed162f2ac", "63ba781e63aa6815f52f0dfd"]
count = 1
for subdir, pID in zip(os.listdir(img_path), personID):
    path = img_path + '/' + subdir
    path = path + '/'
    person = "Known/{}_{}".format(subdir, pID)
    try:
        shutil.rmtree(person)
    except:
        print()
    os.mkdir(person)
    for img in os.listdir(path):
        img_pic = path + img
        cur_img = cv2.imread(img_pic)
        faceLoc = face_recognition.face_locations(cur_img)[0]
        y1, x2, y2, x1 = faceLoc
        img_name = person + "/{}_{}".format(subdir, count) + ".jpg"
        cv2.imwrite(img_name, cur_img[y1:y2, x1:x2])
        print("{} written!".format(img_name))
        count += 1
        class_names.append(subdir)
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
MASK_MODEL_PATH = os.getcwd() + "//masksdetection-master//model//mask_model.h5"
FACE_MODEL_PATH = os.getcwd() + "//masksdetection-master//face_detector"
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


encodeListKnown = find_encodings(images)
turn_counter = 0
img_counter = 0
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
                if name == "Unknown":
                    # auto capture
                    img_counter += 1
                    if img_counter % 10 == 0:
                        img_name = "Unknown/unknown_{}".format(img_counter / 10) + datetime.now().strftime(
                            "%Y%m%d%H%M%S") + ".jpg"
                        cv2.imwrite(img_name, img[y1:y2, x1:x2])
                        print("{} written!".format(img_name))
                else:
                    turn_counter += 1
                    if turn_counter % 10 == 0:
                        img_name = "Turn/{}_".format(name) + datetime.now().strftime(
                            "%Y%m%d%H%M%S") + ".jpg"
                        cv2.imwrite(img_name, img[y1:y2, x1:x2])
                        print("{} written!".format(img_name))

                cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
                cv2.rectangle(img, (x1, y2 - 35), (x2, y2), color, cv2.FILLED)
                cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
                cv2.putText(img, label, (x1, y2 + 10), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 255), 2)
        except:
            print("An exception occurred")

    cv2.imshow('Project', img)

vs.release()
cv2.destroyAllWindows()
