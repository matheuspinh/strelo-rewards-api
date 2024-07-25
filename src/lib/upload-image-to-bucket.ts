import { bucket } from "@/config/bucket";
import { env } from "@/env";
import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { MultipartFile } from "@fastify/multipart";
import { Readable } from "stream";

class UploadImage {
  async execute({ file, userId, address }: { file: MultipartFile, userId: string, address: string }) {
    const { mimetype } = file;



    const type = mimetype.split('/')[1];

    const buffer = await file.toBuffer();
    const contentLength = buffer.length;

    const fileStream = new Readable();
    fileStream.push(buffer);
    fileStream.push(null);

    const sanitizedFilName = `${userId.replace(/\s/g, "")}.${type}`;

    const uploadParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: `${address}/${sanitizedFilName}`,
      Body: fileStream,
      ContentType: mimetype,
      ContentLength: contentLength,
    }

    await bucket
      .send(new PutObjectCommand(uploadParams))
      .catch((err) => {
        console.error('❌ Error uploading image to bucket', err);
        throw new Error('Error uploading image to bucket');
      });

    const location = `${env.AWS_BUCKET_URL}${uploadParams.Key}`

    return location;
  }
}

export default new UploadImage();