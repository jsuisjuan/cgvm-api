/**
 * @class SusCard
 * @description Value Object que representa o Cartão Nacional de Saúde (SUS).
 * Valida a extensão de 15 dígitos e aplica o algoritmo de módulo 11 oficial
 * do Ministério da Saúde para cartões definitivos e provisórios.
 */
export class SusCard {
  private readonly value: string;

  /**
   * Constrói e valida uma instância do Cartão Nacional de Saúde (SUS/CNS).
   * @param {string} value - String bruta do cartão enviado pela apresentação.
   * @throws {Error} Se o número não contiver exatamente 15 dígitos ou falhar
   * na validação matemática oficial do Ministério da Saúde.
   */
  constructor(value: string) {
    const cleanSus = value.replace(/\D/g, '');
    if (cleanSus.length !== 15) {
      throw new Error('SUS card number must contain exactly 15 digits.');
    }
    if (!this.isValidMath(cleanSus)) {
      throw new Error('Invalid SUS card digits verification failed.');
    }
    this.value = cleanSus;
  }

  /**
   * Retorna o valor do cartão do SUS limpo, ideal para persistência.
   * @returns {string} Sequência de 15 números.
   */
  public getValue(): string {
    return this.value;
  }

  /**
   * Executa o algoritmo matemático oficial baseado no Módulo 11 para
   * validar o Cartão Nacional de Saúde (CNS).
   * Suporta cartões definitivos (iniciados em 1, 2 ou 3) e provisórios
   * (iniciados em 7, 8 ou 9).
   * @param {string} sus - String de 15 dígitos numéricos já limpos.
   * @returns {boolean} Verdadeiro se o número for matematicamente válido.
   * @private
   */
  private isValidMath(sus: string): boolean {
    if (/^(\d)\1{14}$/.test(sus)) return false;

    const startDigit = sus[0];
    if (['1', '2', '3'].includes(startDigit)) {
      const pis = sus.substring(0, 11);
      let sum = 0;
      for (let i = 0; i < 11; i++) {
        sum += parseInt(pis.charAt(i)) * (15 - i);
      }
      const rest = sum % 11;
      const dv = rest === 0 ? 0 : 11 - rest;

      if (dv === 10) {
        const sum2 = sum + 2;
        const rest2 = sum2 % 11;
        const dv2 = 11 - rest2;
        return sus === `${pis}001${dv2}`;
      }
      return sus === `${pis}000${dv}`;
    }

    if (['7', '8', '9'].includes(startDigit)) {
      let sum = 0;
      for (let i = 0; i < 15; i++) {
        sum += parseInt(sus.charAt(i)) * (15 - i);
      }
      return sum % 11 === 0;
    }
    return false;
  }
}
