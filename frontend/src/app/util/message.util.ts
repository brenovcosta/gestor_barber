export class MessageUtil {

  static erroToast(titulo: string, detalhe: string){
    return {severity:'error', summary: titulo, detail: detalhe};
  }

  static successToast( detalhe: string, titulo: string = 'Sucesso'){
    return {severity:'success', summary: titulo, detail: detalhe};
  }

  static ERRO_SERVICO_RELACIONADO = 'O serviço está associado a algum horário e por isso não pode ser excluido!';
  static ERRO_HORARIOS_DISPONIVEIS = 'Não foi possível carregar os horários!';
  static ERRO_BUSCA_HORARIO = 'Ocorreu um erro ao buscar o horário, tente novamente mais tarde!';
  static ERRO_AGENDAR_HORARIO = 'Ocorreu um erro ao reservar o horário, tente novamente mais tarde!';


}
