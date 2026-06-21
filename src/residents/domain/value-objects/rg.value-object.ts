/**
 * @class Rg
 * @description Value Object que representa o Reigstro Geral (RG).
 * Como cada estado brasileito possui seu próprio algoritmo emisso, o VO
 * valida o formato alfanumérico e a extensão segura permitida nacionalmente.
 */
export class Rg {
  private readonly value: string;

  /**
   * Constrói e valida uma instância de RG.
   * Remove caracteres especiais (pontos, traços e espaços) e garante que
   * o comprimento atenda aos padrões nacionais aceitáveis.
   * @param {string} value - String bruta do RG enviada pela apresentação.
   * @throws {Error} Se o tamanho do RG limpo for menor que 5 ou maior que 14.
   */
  constructor(value: string) {
    const cleanRg = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (cleanRg.length < 5 || cleanRg.length > 14) {
      throw new Error('RG length must be between 5 and 14 characters.');
    }
    this.value = cleanRg;
  }

  /**
   * Retorna o valor do RG limpo e padronizado, ideal para persistência.
   * @returns {string} O número do RG sem caracteres especiais e em caixa alta.
   */
  public getValue(): string {
    return this.value;
  }
}
