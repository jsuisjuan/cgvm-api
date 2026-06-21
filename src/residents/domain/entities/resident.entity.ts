import {
  Gender,
  EducationLevel,
  ResidentStatus,
} from '@/residents/infraestructure/schemas/resident.schema';

/**
 * @interface ResidentProps
 * @description Definição de tipos para todas as propriedades fundamentais
 * que compõem o estado de um residente (idoso) no domínio de aplicação.
 */
export interface ResidentProps {
  name: string;
  gender: Gender;
  birthDate: Date;
  birthplace: string;
  admissionAge: number;
  admissionDate: Date;
  status: ResidentStatus;
  race?: string;
  religion?: string;
  rg: string;
  cpf: string;
  susCardNumber: string;
  hasHealthInsurance: boolean;
  educationLevel: EducationLevel;
  previousOccupation?: string;
  bloodType?: string;
}

/**
 * @class Resident
 * @description Entidade de Domínio Puro (DDD) que representa um idoso
 * residente na ILPI. Centraliza as regras macro de negócio, comportamentos
 * e ciclo de vida do residente, mantendo-se totalmente isolada de frameworks
 * ou acoplamentos com o banco de dados.
 */
export class Resident {
  private _id?: string;
  private props: ResidentProps;

  /**
   * Constrói uma instância da entidade Resident executando as invariantes de
   * negócio obrigatórias.
   * @param {ResidentPropps} props - Propriedades de dados do residente.
   * @param {string} [id] - Identificador único opcional (caso o registro já
   * exista na persistência).
   * @throws {Error} Se o nome do residente for vazio ou inválido.
   */
  constructor(props: ResidentProps, id?: string) {
    if (!props.name || props.name.trim().length == 0) {
      throw new Error('Resident name cannot be empty.');
    }
    this._id = id;
    this.props = props;
  }

  /**
   * Converte a Entidade de Domínio em um objeto literal JSON seguro e tipado.
   * Muito utilizado pelas camadas de apresentação e infraestrutura (mappers).
   * @returns {{ id?: string } & ResidentProps } Estado atualizado da entidade
   * em formato primitivo estruturado.
   */
  public toJSON(): { id?: string } & ResidentProps {
    return { id: this._id, ...this.props };
  }

  /**
   * Altera o estado do residente indicaando que ele precisou ser transferido
   * temporiariamente para uma unidade hospitalar.
   * @returns {void}
   */
  public hospitalize(): void {
    this.props.status = ResidentStatus.HOSPITALIZED;
  }

  /**
   * Arquiva de forma permanete ou prolongada a ficha do idoso, alterando o
   * seu status motivado por óbito ou por rescisão contratual/saída voluntária
   * (inativo).
   * @param {ResidentStatus.INACTIVE | ResidentStatus.DECEASED} reason - Motivo
   * restrito do arquivamento.
   * @returns {void}
   */
  public archive(
    reason: ResidentStatus.INACTIVE | ResidentStatus.DECEASED,
  ): void {
    this.props.status = reason;
  }
}
