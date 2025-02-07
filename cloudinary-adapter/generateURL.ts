import type { GenerateURL } from "@payloadcms/plugin-cloud-storage/types";

import { v2 as cloudinary } from "cloudinary";
import path from "path";

interface GenerateURLArgs {
  folderSrc: string;
  getStorageClient: () => typeof cloudinary;
}

export const getGenerateURL = ({
  folderSrc,
  getStorageClient,
}: GenerateURLArgs): GenerateURL => {
  return async ({ filename, prefix = "" }) => {
    const publicId = path.posix.join(folderSrc, prefix, filename);
    const extension = filename.toLowerCase().split(".").pop() as string;

    const resource = await getStorageClient().api.resource(publicId, {
      resource_type: "image",
    });

    return resource.secure_url;
  };
};
