import { Gender, EducationLevel, ResidentStatus } from "../../infraestructure/schemas/resident.schema";

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

export class Resident {
  private _id?: string;
  private props: ResidentProps;

  constructor(props: ResidentProps, id?: string) {
    if (!props.name || props.name.trim().length == 0) {
      throw new Error("Resident name cannot be empty.");
    }
    this._id = id;
    this.props = props;
  }

  public toJSON(): { id?: string } & ResidentProps {
    return { id: this._id, ...this.props };
  }

  public hospitalize(): void {
    this.props.status = ResidentStatus.HOSPITALIZED;
  }

  public archive(
    reason: ResidentStatus.INACTIVE | ResidentStatus.DECEASED
  ): void {
    this.props.status = reason;
  }
}