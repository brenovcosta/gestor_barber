import {SelectItem} from "primeng/api";

export class SituacoesUtil {

  static DISPONIVEL = {id: 1, descricao: 'DISPONIVEL'};
  static INDISPONIVEL = {id: 2, descricao: 'INDISPONIVEL'};

  static options: SelectItem[] = [
    {label: SituacoesUtil.DISPONIVEL.descricao, value: SituacoesUtil.DISPONIVEL.id},
    {label: SituacoesUtil.INDISPONIVEL.descricao, value: SituacoesUtil.INDISPONIVEL.id}
  ]

}
