import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type ResidentDocument = HydratedDocument<ResidentSchema>;

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum EducationLevel {
  NONE = "none",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  HIGHER = "higher",
}

export enum ResidentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  HOSPITALIZED = "hospitalized",
  DECEASED = "deceased",
}

@Schema({
  timestamps: true,
  collection: "residents"
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
    default: ResidentStatus.ACTIVE 
  })
  status!: string;

  @Prop({ required: false, trim: true })
  race?: string;

  @Prop({ required: false, trim: true })
  religion?: string;

  @Prop({
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9]{5,14}$/, "Please provide a valid RG number"]
  })
  rg!: string;

  @Prop({ 
    required: true, 
    unique: true, 
    trim: true,
    match: [/^\d{11}$/, "Please provide a valid CPF with exactly 11 digits"]
  })
  cpf!: string;

  @Prop({ 
    required: true, 
    unique: true,
    trim: true,
    match: [
      /^\d{15}$/, 
      "Please provide a valid SUS National Health Card with 15 digits"
    ]
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

export const ResidentSchemaDefinition = SchemaFactory.createForClass(ResidentSchema);