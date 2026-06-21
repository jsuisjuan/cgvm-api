import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '@/infrastructure/database/database.module';

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
