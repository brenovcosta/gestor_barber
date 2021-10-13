import { Component, OnInit } from '@angular/core';
import {Servico} from "../../model/servico.model";

@Component({
  selector: 'app-servico-listagem',
  templateUrl: './servico-listagem.component.html',
  styleUrls: ['./servico-listagem.component.css']
})
export class ServicoListagemComponent implements OnInit {

  servicos: Servico[] = [
    {
      id:1,
      nome: 'Corte de Cabelo',
      preco: 18.65,
      descricao: "Corte de Cabelo"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
