import { MongooseModuleOptions } from "@nestjs/mongoose";

export const getMongoConfig = (): MongooseModuleOptions => {
  const host = process.env.MONGO_HOST;
  const port = process.env.MONGO_PORT;
  const database = process.env.MONGO_DATABASE;
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;

  const credentials = username && password ? `${username}:${password}@` : '';
  return {
    uri: `mongodb://${credentials}${host}:${port}/${database}`,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };
};