import type { HandleUpload } from "@payloadcms/plugin-cloud-storage/types";
import type { CollectionConfig } from "payload";

import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import type stream from "stream";
import path from "path";
import fs from "fs";

interface HandleUploadArgs {
  folderSrc: string;
  collection: CollectionConfig;
  getStorageClient: () => typeof cloudinary;
  prefix?: string;
}

const multipartThreshold = 1024 * 1024 * 99; // 99MB

export const getHandleUpload = ({
  folderSrc,
  getStorageClient,
  prefix = "",
}: HandleUploadArgs): HandleUpload => {
  return async ({ data, file }) => {
    const fileKey = path.posix.join(data.prefix || prefix, file.filename);
    const config: UploadApiOptions = {
      resource_type: "auto",
      public_id: fileKey,
      folder: folderSrc,
    };

    const fileBufferOrStream: Buffer | stream.Readable = file.tempFilePath
      ? fs.createReadStream(file.tempFilePath)
      : file.buffer;

    if (file.buffer.length > 0 && file.buffer.length < multipartThreshold) {
      await new Promise((resolve, reject) => {
        getStorageClient()
          .uploader.upload_stream(config, (error, result) => {
            if (error) {
              reject(error);
            }

            resolve(result);
          })
          .end(fileBufferOrStream);
      });

      return data;
    }

    await new Promise((resolve, reject) => {
      getStorageClient()
        .uploader.upload_chunked_stream(config, (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result);
        })
        .end(fileBufferOrStream);
    });

    return data;
  };
};
