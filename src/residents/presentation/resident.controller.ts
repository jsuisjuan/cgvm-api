import { Controller, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdmissionService } from "../application/services/admission.service";
import { CreateAdmissionDto } from "./dtos/create-admission.dto";

@Controller("residents")
export class ResidentController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Post("admission")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  public async admit(@Body() dto: CreateAdmissionDto) {
    const resident = await this.admissionService.admitResident(dto);
    return resident.toJSON();
  }
}