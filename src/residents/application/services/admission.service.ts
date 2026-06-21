import { Injectable } from '@nestjs/common';
import { ResidentRepository } from '@/residents/infraestructure/repositories/resident.repository';
import { Resident } from '@/residents/domain/entities/resident.entity';
import { Cpf } from '@/residents/domain/value-objects/cpf.value-object';
import { CreateAdmissionDto } from '@/residents/presentation/dtos/create-admission.dto';
import { ResidentStatus } from '@/residents/infraestructure/schemas/resident.schema';

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
    const validatedCpf = new Cpf(dto.cpf);

    const birthDate = new Date(dto.birthDate);
    const admissionDate = new Date(dto.admissionDate);
    const admissionAge = this.calculateAdmissionAge(birthDate, admissionDate);

    const resident = new Resident({
      ...dto,
      birthDate,
      admissionAge,
      admissionDate,
      status: ResidentStatus.ACTIVE,
      cpf: validatedCpf.getValue(),
    });
    await this.residentRepository.save(resident);
    return resident;
  }

  /**
   * Algoritmo utilitário que calcula a idade cronológica exata do idoso
   * com base na sua data de nascimento e na data específica da admissão.
   * @param {Date} birth - Data de nascimento do residente.
   * @param {Date} admission - Data em que a admissão está sendo realizada.
   * @returns {number} A idade calculada em anos.
   * @private
   */
  private calculateAdmissionAge(birth: Date, admission: Date): number {
    let age = admission.getFullYear() - birth.getFullYear();
    const monDiff = admission.getMonth() - birth.getMonth();
    const isBeforeBirth =
      monDiff === 0 && admission.getDate() < birth.getDate();
    if (monDiff < 0 || isBeforeBirth) age--;
    return age;
  }
}
