import { S3 } from "aws-sdk";
import s3 from "../middleware/awsS3";

export const uploadToS3 = async (file: Express.Multer.File, bucketName: string) => {
  try {
    const newFileName = Date.now() + "-" + file.originalname;

    const params = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: newFileName,
      ContentType: file.mimetype,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  } catch (error) {
    return error;
  }
};
