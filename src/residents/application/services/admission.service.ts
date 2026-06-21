import { Injectable } from "@nestjs/common";
import { ResidentRepository } from "../../infraestructure/repositories/resident.repository";
import { Resident } from "../../domain/entities/resident.entity";
import { Cpf } from "../../domain/value-objects/cpf.value-object";
import { CreateAdmissionDto } from "../../presentation/dtos/create-admission.dto";
import { ResidentStatus } from "../../infraestructure/schemas/resident.schema";

@Injectable()
export class AdmissionService {
  constructor(private readonly residentRepository: ResidentRepository) {}

  public async admitResident(dto: CreateAdmissionDto): Promise<Resident> {
    const validatedCpf = new Cpf(dto.cpf);
    const birth = new Date(dto.birthDate);
    const admission = new Date(dto.admissionDate);
    let age = admission.getFullYear() - birth.getFullYear();
    const monthDiff = admission.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && admission.getDate() < birth.getDate())) {
      age--;
    }
    const resident = new Resident({
      name: dto.name,
      gender: dto.gender,
      birthDate: birth,
      birthplace: dto.birthplace,
      admissionAge: age,
      admissionDate: admission,
      status: ResidentStatus.ACTIVE,
      race: dto.race,
      religion: dto.religion,
      rg: dto.rg,
      cpf: validatedCpf.getValue(),
      susCardNumber: dto.susCardNumber,
      hasHealthInsurance: dto.hasHealthInsurance,
      educationLevel: dto.educationLevel,
      previousOccupation: dto.previousOccupation,
      bloodType: dto.bloodType,
    });
    await this.residentRepository.save(resident);
    return resident;
  }
}