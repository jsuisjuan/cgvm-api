import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/infrastructure/database/mongodb.config';
import { ResidentsModule } from '@/residents/residents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    ResidentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
