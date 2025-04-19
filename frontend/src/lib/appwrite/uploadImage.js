import { ID } from "appwrite";
import { appwriteConfig, storage } from "./config";

// Upload File
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId, // Use config value for bucket
      ID.unique(),
      file
    );

    return uploadedFile; // This contains $id
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Get File Download URL (No Transformations)
export function getFileUrl(fileId) {
  try {
    return storage.getFileDownload(appwriteConfig.storageId, fileId).href;
  } catch (error) {
    console.error("Error getting file URL:", error);
    return null;
  }
}
