export class MessageUtil {

  static erroToast(titulo: string, detalhe: string){
    return {severity:'error', summary: titulo, detail: detalhe};
  }

  static successToast( detalhe: string, titulo: string = 'Sucesso'){
    return {severity:'success', summary: titulo, detail: detalhe};
  }


}
