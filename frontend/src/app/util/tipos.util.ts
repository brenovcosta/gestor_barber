import {Tipo} from "../model/tipo.model";
import {Pessoa} from "../model/pessoa.model";

export class TiposUtil {

  static ADMINISTRADOR = {id: 'ADMINISTRADOR', nome: 'Administrador'};
  static FUNCIONARIO = {id: 'FUNCIONARIO', nome: 'Funcionário'};
  static CLIENTE = {id: 'CLIENTE', nome: 'Cliente'};

  public  static exibeTipo(pessoa: Pessoa): string{
    if (pessoa.tipo == TiposUtil.CLIENTE.id){
      return TiposUtil.CLIENTE.nome;
    }
    if (pessoa.tipo == TiposUtil.FUNCIONARIO.id){
      return TiposUtil.FUNCIONARIO.nome;
    }
    if (pessoa.tipo == TiposUtil.ADMINISTRADOR.id){
      return TiposUtil.ADMINISTRADOR.nome;
    }
    return '';
  }

  static tipos: Tipo[] = [
    {id: 'ADMINISTRADOR', nome: 'Administrador'},
    {id: 'FUNCIONARIO', nome: 'Funcionário'},
    {id: 'CLIENTE', nome: 'Cliente'},
  ]

}
