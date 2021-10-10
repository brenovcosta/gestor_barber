import {Pessoa} from "./pessoa.model";
import {Servico} from "./servico.model";

export class Agenda {

  public id?: number;
  public inicio?: string;
  public fim?: string;
  public situacao?: string;
  public pessoa?: Pessoa;
  public servico?: Servico;

  constructor(){ }
}
