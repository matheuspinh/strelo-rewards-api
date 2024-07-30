import * as AWS3 from '@aws-sdk/client-s3';
import { env } from '../env'

export const bucket = new AWS3.S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})