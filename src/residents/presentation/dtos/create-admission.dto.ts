import { IsNotEmpty, IsString, IsEnum, IsDateString, IsBoolean, IsOptional, MaxLength, Length } from "class-validator";
import { EducationLevel, Gender } from "../../infraestructure/schemas/resident.schema";

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