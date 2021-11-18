import {SelectItem} from "primeng/api";

export class SituacoesUtil {

  static DISPONIVEL = {id: 1, descricao: 'Disponível'};
  static RESERVADO = {id: 2, descricao: 'Reservado'};
  static CONCLUIDO = {id: 3, descricao: 'Concluído'};

  static options: SelectItem[] = [
    {label: SituacoesUtil.DISPONIVEL.descricao, value: SituacoesUtil.DISPONIVEL.id},
    {label: SituacoesUtil.RESERVADO.descricao, value: SituacoesUtil.RESERVADO.id},
    {label: SituacoesUtil.CONCLUIDO.descricao, value: SituacoesUtil.CONCLUIDO.id}
  ]

}
