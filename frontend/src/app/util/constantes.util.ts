export class ConstantesUtil {

  static erroTamanho = "Tamanho inválido!";
  static campo(campo: string, min: number, max: number){
    return `O campo ${campo} deve ter entre ${min} e ${max} caracteres!`;
  }

  static erroObrigatorio = "Campo obrigatório!";
  static campoObrigatorio(campo: string){
    return `O campo ${campo} é obrigatório!`;
  }

  static formatoInvalido = "Valor inválido!";
  static campoInvalido(campo: string){
    return `O valor do campo ${campo} deve ser maior que zero!`;
  }

  static erroData = "Data inválida!";
  static dataInvalida(campo: string){
    return `A data do campo ${campo} deve ser maior que a atual!`;
  }


}
