import { Controller, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdmissionService } from "../application/services/admission.service";
import { CreateAdmissionDto } from "./dtos/create-admission.dto";
import { ResidentProps } from "../domain/entities/resident.entity";

/**
 * @class ResidentController
 * @description Controller da camada de Apresentação responsável por expor os endpoints HTTP 
 * relacionados aos residentes. Atua como a porta de entrada da API, recebendo requisições, 
 * delegando as ações para a camada de Aplicação e devolvendo as respostas formatadas.
 */
@Controller("residents")
export class ResidentController {
  /**
   * Construtor do controller, injetando o serviço orquestrador de admissões.
   * @param {AdmissionService} admissionService - Serviço que executa os casos de uso de admissão.
   */
  constructor(private readonly admissionService: AdmissionService) {}

  /**
   * Endpoint HTTP POST que processa a entrada e admissão de um novo idoso na instituição.
   * Rota: POST /residents/admission
   * * @param {CreateAdmissionDto} dto - Payload de entrada contendo a Ficha Admissional do residente.
   * @returns {Promise<ReturnType<InstanceType<typeof import("../domain/entities/resident.entity.js").Resident>['toJSON']>>} 
   * Retorna o estado serializado em formato JSON da entidade criada (incluindo ID gerado ou propriedades finais).
   */
  @Post("admission")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  public async admit(@Body() dto: CreateAdmissionDto): Promise<{ id?: string; } & ResidentProps> {
    const resident = await this.admissionService.admitResident(dto);
    return resident.toJSON();
  }
}