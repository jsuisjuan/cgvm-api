import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ResidentSchemaDefinition,
  ResidentSchema,
} from '@/residents/infraestructure/schemas/resident.schema';
import { ResidentController } from '@/residents/presentation/resident.controller';
import { AdmissionService } from '@/residents/application/services/admission.service';
import { ResidentRepository } from '@/residents/infraestructure/repositories/resident.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResidentSchema.name, schema: ResidentSchemaDefinition },
    ]),
  ],
  controllers: [ResidentController],
  providers: [AdmissionService, ResidentRepository],
  exports: [ResidentRepository],
})
export class ResidentsModule {}
