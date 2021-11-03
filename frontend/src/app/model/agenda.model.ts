import {Pessoa} from "./pessoa.model";
import {Servico} from "./servico.model";

export class Agenda {

  public id?: number;
  public inicio?: Date;
  public fim?: Date;
  public disponivel?: string;
  public pessoa?: Pessoa;
  public servico?: Servico;

  constructor(){ }
}
