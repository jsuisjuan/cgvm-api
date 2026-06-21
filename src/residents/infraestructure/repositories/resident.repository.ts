import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResidentSchema, ResidentDocument } from "../schemas/resident.schema";
import { Resident } from "../../domain/entities/resident.entity";

/**
 * @class ResidentMapper
 * @description Classe utilitária responsável por isolar as transformações de dados
 * entre a camada de Domínio Puro e a camada de Persistência (Banco de Dados).
 * Implementa o padrão Data Mapper para garantir o desacoplamento do DDD.
 */
class ResidentMapper {
  /**
   * Traduz uma entidade de domínio estruturada para um formato que o Mongoose
   * espera receber para salvar no MongoDB.
   * @param {Resident} domain - A instância da entidade de domínio Resident.
   * @returns {Omit<ReturnType<Resident["toJSON"]>, "id">} O objeto limpo pronto para persistência, sem o campo "id".
   */
  static toPersistence(domain: Resident) {
    const {id, ...persistenceData } = domain.toJSON();
    return persistenceData;
  }
}

/**
 * @class ResidentRepository
 * @description Repositório concreto da camada de infraestrutura responsável por realizar
 * as operações de escrita e leitura de residentes diretamente na coleção do MongoDB.
 */
@Injectable()
export class ResidentRepository {
  /**
   * Construtor do repositório, injetando o Model hidratado do Mongoose.
   * @param {Model<ResidentDocument>} residentModel - Model nativo do Mongoose para gerenciar a coleção "residents".
   */
  constructor(
    @InjectModel(ResidentSchema.name)
    private readonly residentModel: Model<ResidentDocument>
  ) {}

  /**
   * Persiste uma nova instância de residente no MongoDB.
   * Transforma a entidade através do Mapper antes de executar a gravação.
   * @param {Resident} resident - A entidade de domínio do residente que será salva.
   * @returns {Promise<void>} Uma Promessa resolvida assim que o documento for inserido com sucesso. 
   */
  public async save(resident: Resident): Promise<void> {
    const persistenceModel = ResidentMapper.toPersistence(resident);
    const createdResident = new this.residentModel(persistenceModel);
    await createdResident.save();
  }
}