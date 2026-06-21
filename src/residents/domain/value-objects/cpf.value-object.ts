export class Cpf {
  private readonly value: string;

  constructor(value: string) {
    const cleanCpf = value.replace(/\D/g, "");
    if (cleanCpf.length !== 11) {
      throw new Error("CPF must contain exactly 11 numeric digits.");
    }
    this.value = cleanCpf;
  }

  public getValue(): string {
    return this.value;
  }

  public getFormatted(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
}