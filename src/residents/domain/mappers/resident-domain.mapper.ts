import { CreateAdmissionDto } from '@/residents/presentation/dtos/create-admission.dto';
import { Resident } from '@/residents/domain/entities/resident.entity';
import { Cpf } from '@/residents/domain/value-objects/cpf.value-object';
import { Rg } from '@/residents/domain/value-objects/rg.value-object';
import { SusCard } from '@/residents/domain/value-objects/sus-card.value-object';
import { ResidentStatus } from '@/residents/infraestructure/schemas/resident.schema';

/**
 * @class ResidentDomainMapper
 * @description Mapper responsável por transformar dados externos (DTO) em uma
 * Entidade de Domínio instanciada e totalmente validada com seus Value Objects.
 */
export class ResidentDomainMapper {
  /**
   * Transforma o DTO de admissão em uma Entidade de Domínio Resident.
   * Centraliza as validações de documentos e cálculos cronológicos.
   * @param {CreateAdmissionDto} dto - DTO de entrada.
   * @returns {Resident} Instância da entidade Resident pronta para uso.
   */
  public static toDomain(dto: CreateAdmissionDto): Resident {
    const cpf = new Cpf(dto.cpf).getValue();
    const rg = new Rg(dto.rg).getValue();
    const susCardNumber = new SusCard(dto.susCardNumber).getValue();

    const birthDate = new Date(dto.birthDate);
    const admissionDate = new Date(dto.admissionDate);
    const admissionAge = this.calculateAge(birthDate, admissionDate);
    return new Resident({
      ...dto,
      birthDate,
      admissionDate,
      admissionAge,
      status: ResidentStatus.ACTIVE,
      cpf,
      rg,
      susCardNumber,
    });
  }

  /**
   * Algoritmo utilitário que calcula a idade cronológica exata do idoso
   * com base na sua data de nascimento e na data específica da admissão.
   * @param {Date} birth - Data de nascimento do residente.
   * @param {Date} admission - Data em que a admissão está sendo realizada.
   * @returns {number} A idade calculada em anos.
   * @private
   */
  private static calculateAge(birth: Date, admission: Date): number {
    let age = admission.getFullYear() - birth.getFullYear();
    const monDiff = admission.getMonth() - birth.getMonth();
    const isBeforeBirth =
      monDiff === 0 && admission.getDate() < birth.getDate();
    if (monDiff < 0 || isBeforeBirth) age--;
    return age;
  }
}
