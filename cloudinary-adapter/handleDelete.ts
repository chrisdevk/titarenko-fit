import type { HandleDelete } from "@payloadcms/plugin-cloud-storage/types";

import { v2 as cloudinary } from "cloudinary";
import path from "path";

interface HandleDeleteArgs {
  folderSrc: string;
  getStorageClient: () => typeof cloudinary;
}

export const getHandleDelete = ({
  folderSrc,
  getStorageClient,
}: HandleDeleteArgs): HandleDelete => {
  return async ({ doc: { prefix = "" }, filename }) => {
    const publicId = path.posix.join(folderSrc, prefix, filename);
    const extension = filename.toLowerCase().split(".").pop() as string;

    await getStorageClient().uploader.destroy(publicId, {
      resource_type: "image",
    });
  };
};
