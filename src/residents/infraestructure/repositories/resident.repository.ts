import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResidentSchema, ResidentDocument } from "../schemas/resident.schema";
import { Resident } from "../../domain/entities/resident.entity";

class ResidentMapper {
  static toPersistence(domain: Resident) {
    const {id, ...persistenceData } = domain.toJSON();
    return persistenceData;
  }
}

@Injectable()
export class ResidentRepository {
  constructor(
    @InjectModel(ResidentSchema.name)
    private readonly residentModel: Model<ResidentDocument>
  ) {}

  public async save(resident: Resident): Promise<void> {
    const persistenceModel = ResidentMapper.toPersistence(resident);
    const createdResident = new this.residentModel(persistenceModel);
    await createdResident.save();
  }
}