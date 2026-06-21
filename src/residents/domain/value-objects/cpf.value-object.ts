/**
 * @class Cpf
 * @description Value Object (Objeto de Valor) que representa um CPF (Cadastro de Pessoas Físicas).
 * Centraliza as regras de formatação, limpeza e a validação matemática estrita dos dígitos verificadores.
 * No DDD, garante a invariante de que nenhum CPF malformado ou inválido trafegue pelo domínio.
 */
export class Cpf {
  private readonly value: string;

  /**
   * Constrói e valida uma instância de CPF.
   * @param {string} value - String bruta do CPF (aceita formatos com pontos/hífen ou apenas números).
   * @throws {Error} Se o CPF não tiver 11 dígitos, se for uma sequência repetida ou falhar nos dígitos verificadores.
   */
  constructor(value: string) {
    const cleanCpf = value.replace(/\D/g, "");
    if (cleanCpf.length !== 11) {
      throw new Error("CPF must contain exactly 11 numeric digits.");
    }
    if (/^(\d)\1{10}$/.test(cleanCpf)) {
      throw new Error("CPF cannot be a sequence of identical digits.");
    }
    if (!this.isValidMath(cleanCpf)) {
      throw new Error("Invalid CPF digits verification failed.");
    }
    this.value = cleanCpf;
  }

  /**
   * Retorna o valor do CPF limpo, ideal para armazenamento no banco de dados.
   * @returns {string} Sequência de 11 números.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Retorna o CPF formatado com a máscara padrão nacional (Ex: "000.000.000-00").
   * Ideal para exibição em telas de apresentação ou relatórios.
   * @returns {string} CPF mascarado.
   */
  public getFormatted(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  /**
   * Algoritmo oficial de validação dos dois dígitos verificadores do CPF.
   * Multiplica os dígitos por pesos decrescentes para validar os restos da divisão por 11.
   * @param {string} cpf - String de 11 dígitos numéricos já limpos.
   * @returns {boolean} Verdadeiro se os dígitos verificadores forem matematicamente válidos.
   * @private
   */
  private isValidMath(cpf: string): boolean {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstCheckDigit = 11 - (sum & 11);
    if (firstCheckDigit >= 10) firstCheckDigit = 0;
    if (firstCheckDigit !== parseInt(cpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondCheckDigit = 11 - (sum % 11);
    if (secondCheckDigit >= 10) secondCheckDigit = 0;
    if (secondCheckDigit !== parseInt(cpf.charAt(10))) {
      return false;
    }
    return true;
  }
}