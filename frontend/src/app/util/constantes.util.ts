export class ConstantesUtil {

  static erroTamanho = "Tamanho inválido!";
  static campo(campo: string, min: number, max: number){
    return `O campo ${campo} deve ter entre ${min} e ${max} caracteres!`;
  }

  static erroObrigatorio = "Campo obrigatório!";
  static campoObrigatorio(campo: string){
    return `O campo ${campo} é obrigatório!`;
  }

}
