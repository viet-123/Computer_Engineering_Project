from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import os

# Define connection string and container name
connect_str = "DefaultEndpointsProtocol=https;AccountName=test8afa;AccountKey=yGrTX7zMZbCWadHxrK5mkm9yMJ/HwGl93foZ6+eWCQwo6DHCMLCrbPJF5fDPH4gR6slgJLkdRlAE+AStq+aazw==;EndpointSuffix=core.windows.net"
container_name = "testcontainer"

# Create the BlobServiceClient object
blob_service_client = BlobServiceClient.from_connection_string(connect_str)

# Create a ContainerClient object for the container
container_client = blob_service_client.get_container_client(container_name)

# Set the path of the image file to upload
local_path = "./20230216234817_IMG_1844.jpg"

# Set the name for the blob
blob_name = os.path.basename(local_path)

# Create a BlobClient object for the blob
blob_client = container_client.get_blob_client(blob_name)

# Upload the image file to Azure Blob Storage
with open(local_path, "rb") as data:
    blob_client.upload_blob(data, overwrite=True)
