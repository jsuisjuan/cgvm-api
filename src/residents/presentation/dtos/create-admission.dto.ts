import { IsNotEmpty, IsString, IsEnum, IsDateString, IsBoolean, IsOptional, MaxLength, Length } from "class-validator";
import { EducationLevel, Gender } from "../../infraestructure/schemas/resident.schema";

/**
 * @class CreateAdmissionDto
 * @description Data Transfer Object (DTO) que define a estrutura de dados, tipagem rigorosa 
 * e regras de validação para o payload de entrada na criação de uma nova Ficha Admissional.
 * Utilizado na camada de Apresentação para barrar requisições inválidas antes de chegarem ao domínio.
 */
export class CreateAdmissionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender!: Gender;

  @IsNotEmpty()
  @IsDateString()
  birthDate!: string;

  @IsNotEmpty()
  @IsString()
  birthplace!: string;

  @IsNotEmpty()
  @IsDateString()
  admissionDate!: string;

  @IsNotEmpty()
  @IsString()
  race?: string;

  @IsOptional()
  @IsString()
  religion?: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 14)
  rg!: string;

  @IsNotEmpty()
  @IsString()
  cpf!: string;

  @IsNotEmpty()
  @IsString()
  @Length(15, 15)
  susCardNumber!: string;

  @IsNotEmpty()
  @IsBoolean()
  hasHealthInsurance!: boolean;

  @IsNotEmpty()
  @IsEnum(EducationLevel)
  educationLevel!: EducationLevel;

  @IsOptional()
  @IsString()
  previousOccupation?: string;

  @IsOptional()
  @IsString()
  bloodType?: string;
}