import { Component, OnInit } from '@angular/core';
import {Servico} from "../../model/servico.model";

@Component({
  selector: 'app-servico-listagem',
  templateUrl: './servico-listagem.component.html',
  styleUrls: ['./servico-listagem.component.css']
})
export class ServicoListagemComponent implements OnInit {

  servicos!: Servico[];

  constructor() { }

  ngOnInit(): void {
  }

}
