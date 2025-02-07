import type {
  Adapter,
  GeneratedAdapter,
} from "@payloadcms/plugin-cloud-storage/types";
import { ConfigOptions, v2 as cloudinary } from "cloudinary";

import { getGenerateURL } from "./generateURL";
import { getHandleDelete } from "./handleDelete";
import { getHandleUpload } from "./handleUpload";
import { getHandler } from "./staticHandler";

export interface Args {
  folder?: string;
  config: ConfigOptions;
}

// Video extensions
export const videoExtensions = [
  "mp2",
  "mp3",
  "mp4",
  "mov",
  "avi",
  "mkv",
  "flv",
  "wmv",
  "webm",
  "mpg",
  "mpe",
  "mpeg",
];

export const cloudinaryAdapter =
  ({ folder, config = {} }: Args): Adapter =>
  ({ collection, prefix }): GeneratedAdapter => {
    if (!cloudinary) {
      throw new Error(
        "The package cloudinary is not installed, but is required for the plugin-cloud-storage Cloudinary adapter. Please install it.",
      );
    }

    let storageClient: null | typeof cloudinary = null;
    const folderSrc = folder ? folder.replace(/^\/|\/$/g, "") + "/" : "";

    const getStorageClient = (): typeof cloudinary => {
      if (storageClient) return storageClient;

      cloudinary.config(config);
      storageClient = cloudinary;
      return storageClient;
    };

    return {
      name: "cloudinary",
      generateURL: getGenerateURL({ folderSrc, getStorageClient }),
      handleDelete: getHandleDelete({ folderSrc, getStorageClient }),
      handleUpload: getHandleUpload({
        folderSrc,
        collection,
        getStorageClient,
        prefix,
      }),
      staticHandler: getHandler({ folderSrc, collection, getStorageClient }),
    };
  };
