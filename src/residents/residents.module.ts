import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { 
  ResidentSchemaDefinition, 
  ResidentSchema 
} from "./infraestructure/schemas/resident.schema";
import { ResidentController } from "./presentation/resident.controller";
import { AdmissionService } from "./application/services/admission.service";
import { ResidentRepository } from "./infraestructure/repositories/resident.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResidentSchema.name, schema: ResidentSchemaDefinition }
    ]),
  ],
  controllers: [ResidentController],
  providers: [AdmissionService, ResidentRepository],
  exports: [ResidentRepository]
})
export class ResidentsModule {}