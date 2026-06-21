import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

/**
 * @type ResidentDocument
 * @description Tipo customizado que representa um documento do Mongoose
 * "hidratado". Combina as propriedades da classe ResidentSchema com as
 * propriedades e métodos nativos de documentos do MongoDB (como _id,
 * __v, .save(), .populate(), etc.).
 */
export type ResidentDocument = HydratedDocument<ResidentSchema>;

/**
 * @enum Gender
 * @description Opções de gênero biológico e identidade do residente
 * para fins de registro e cuidado.
 */
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

/**
 * @enum EducationLevel
 * @description Graus de instrução e escolaridade formais declarados na
 * admissão do idoso.
 */
export enum EducationLevel {
  NONE = 'none',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  HIGHER = 'higher',
}

/**
 * @enum ResidentStatus
 * @description Estados do ciclo de vida e situação administrativa atual do
 * residente dentro da ILPI.
 */
export enum ResidentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  HOSPITALIZED = 'hospitalized',
  DECEASED = 'deceased',
}

/**
 * @class ResidentSchema
 * @description Definição do modelo de dados e mapeamento estrutural para o
 * MongoDB. Modela a collection 'residents' na infraestrutura e aplica
 * constraints, tipos e hooks nativos.
 */
@Schema({
  timestamps: true,
  collection: 'residents',
})
export class ResidentSchema extends Document {
  @Prop({ required: true, trim: true, maxLength: 255 })
  name!: string;

  @Prop({ required: true, enum: Gender })
  gender!: string;

  @Prop({ required: true })
  birthDate!: Date;

  @Prop({ required: true, trim: true })
  birthplace!: string;

  @Prop({ required: true, min: 0 })
  admissionAge!: number;

  @Prop({ required: true })
  admissionDate!: Date;

  @Prop({
    required: true,
    enum: ResidentStatus,
    default: ResidentStatus.ACTIVE,
  })
  status!: string;

  @Prop({ required: false, trim: true })
  race?: string;

  @Prop({ required: false, trim: true })
  religion?: string;

  @Prop({
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9]{5,14}$/, 'Please provide a valid RG number'],
  })
  rg!: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    match: [/^\d{11}$/, 'Please provide a valid CPF with exactly 11 digits'],
  })
  cpf!: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\d{15}$/,
      'Please provide a valid SUS National Health Card with 15 digits',
    ],
  })
  susCardNumber!: string;

  @Prop({ required: true, default: false })
  hasHealthInsurance!: boolean;

  @Prop({ required: true, enum: EducationLevel, default: EducationLevel.NONE })
  educationLevel!: string;

  @Prop({ required: false, trim: true })
  previousOccupation?: string;

  @Prop({ required: false, trim: true })
  bloodType?: string;
}

/**
 * @const ResidentSchemaDefinition
 * @description Compila a definição de classe do NestJS em um Schema nativo
 * do Mongoose.Usado exclusivamente pelo NestJS na inicialização de módulos
 * (`MongooseModule.forFeature`) para injetar a estrutura correspondente e
 * interagir diretamente com o banco NoSQL.
 */
export const ResidentSchemaDefinition =
  SchemaFactory.createForClass(ResidentSchema);
