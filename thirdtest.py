import cv2
import os
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

# Set up the BlobServiceClient
connection_string = "DefaultEndpointsProtocol=https;AccountName=test8afa;AccountKey=yGrTX7zMZbCWadHxrK5mkm9yMJ/HwGl93foZ6+eWCQwo6DHCMLCrbPJF5fDPH4gR6slgJLkdRlAE+AStq+aazw==;EndpointSuffix=core.windows.net"
blob_service_client = BlobServiceClient.from_connection_string(connection_string)
container_client = blob_service_client.get_container_client("imagestorage")

# Set up the face detection classifier
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Capture an image from the webcam
cap = cv2.VideoCapture(0)
ret, frame = cap.read()

# Detect the face in the image
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

# Save three images of the face
for i, (x, y, w, h) in enumerate(faces):
    # Crop the face region
    face = frame[y:y+h, x:x+w]
    # Save the original image
    cv2.imwrite(f"face{i}_original.jpg", face)
    # Apply grayscale filter
    face_gray = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
    cv2.imwrite(f"face{i}_grayscale.jpg", face_gray)
    # Apply edge detection filter
    face_edges = cv2.Canny(face_gray, 100, 200)
    cv2.imwrite(f"face{i}_edges.jpg", face_edges)

    # Upload the three images to Blob Storage
    for j, img_file in enumerate([f"face{i}_original.jpg", f"face{i}_grayscale.jpg", f"face{i}_edges.jpg"]):
        with open(img_file, "rb") as data:
            blob_client = container_client.get_blob_client(os.path.basename(img_file))
            blob_client.upload_blob(data, overwrite=True)

# Release the capture
cap.release()
cv2.destroyAllWindows()
