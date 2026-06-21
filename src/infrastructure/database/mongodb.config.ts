import { Module, Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "./database.module";

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => getMongoConfig(),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}