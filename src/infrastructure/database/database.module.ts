import { MongooseModuleOptions } from '@nestjs/mongoose';

/**
 * @function getMongoConfig
 * @description Fábrica de configuração (Factory) responsável por ler
 * dinamicamente as variáveis de ambiente e montar as opções de conexão do
 * Mongoose com o MongoDB. Centraliza parâmetros de timeout e resiliência
 * cruciais para o ambiente de produção.
 * * @returns {MongooseModuleOptions} Objeto contendo a URI estruturada e as
 * opções de pooling/timeout do Mongoose.
 */
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
