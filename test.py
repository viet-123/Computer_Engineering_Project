import os
import time
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

# Set the connection string and container name
connection_string = "DefaultEndpointsProtocol=https;AccountName=test8afa;AccountKey=yGrTX7zMZbCWadHxrK5mkm9yMJ/HwGl93foZ6+eWCQwo6DHCMLCrbPJF5fDPH4gR6slgJLkdRlAE+AStq+aazw==;EndpointSuffix=core.windows.net"
container_name = "testcontainer"

# Create a BlobServiceClient object
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

# Download new or updated blobs every 10 seconds
while True:
    print("Waiting image from blod ...")
    # Get a list of blobs in the container
    container_client = blob_service_client.get_container_client(container_name)
    blob_list = container_client.list_blobs()

    # Download any new or updated blobs to the current working directory
    local_path = os.getcwd() + "//test"
    for blob in blob_list:
        local_filename = blob.name
        local_filepath = os.path.join(local_path, local_filename)

        # Check if the blob already exists locally
        if os.path.exists(local_filepath):
            # Check if the blob has been modified since it was last downloaded
            blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob.name)
            blob_properties = blob_client.get_blob_properties()
            blob_last_modified = blob_properties.last_modified
            local_last_modified = os.path.getmtime(local_filepath)
            if blob_last_modified.timestamp() <= local_last_modified:
                # The blob has not been modified since it was last downloaded
                continue

        # Download the blob
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob.name)
        with open(local_filepath, "wb") as my_blob:
            download_stream = blob_client.download_blob()
            my_blob.write(download_stream.readall())

        print(f"Blob {blob.name} downloaded to {local_filepath}")

    # Wait for 5 seconds before checking for new blobs again
    time.sleep(5)