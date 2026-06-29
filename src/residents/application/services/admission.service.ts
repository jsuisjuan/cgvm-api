import { Injectable } from '@nestjs/common';
import { ResidentRepository } from '@/residents/infraestructure/repositories/resident.repository';
import { Resident } from '@/residents/domain/entities/resident.entity';
import { CreateAdmissionDto } from '@/residents/presentation/dtos/create-admission.dto';
import { ResidentDomainMapper } from '@/residents/domain/mappers/resident-domain.mapper';

/**
 * @class AdmissionService
 * @description Serviço da camada de aplicação responsável por orchestrar o
 * fluxo de admissão e criação da Ficha Admissional de novos idosos
 * (residentes) na ILPI.
 */
@Injectable()
export class AdmissionService {
  constructor(private readonly residentRepository: ResidentRepository) {}

  /**
   * Executa o caso de uso de admissão de um novo residente.
   * Valida as regras de negócio iniciais, calcula a idade da admissão e
   * persiste o registro.
   * @param {CreateAdmissionDto} dto - Payload de entrada validado com os dados
   * admissionais.
   * @returns {Promise<Resident>} Uma promessa contendo a entidade de domínio do
   * residente criado.
   * @throws {Error} Se o CPF for inválido ou se as validações da entidade
   * falharem.
   */
  public async admitResident(dto: CreateAdmissionDto): Promise<Resident> {
    const resident = ResidentDomainMapper.toDomain(dto);
    await this.residentRepository.save(resident);
    return resident;
  }
}
