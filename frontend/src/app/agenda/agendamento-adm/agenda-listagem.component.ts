import { Component, OnInit } from '@angular/core';
import {Agenda} from "../../model/agenda.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agenda-listagem',
  templateUrl: './agenda-listagem.component.html',
  styleUrls: ['./agenda-listagem.component.css']
})
export class AgendaListagemComponent implements OnInit {

  agenda = new Agenda();
  horarios: Agenda[] = [
    {
      id: 1,
      inicio: new Date(),
      fim: new Date(),
      servico: {
        id:1,
        nome: 'Corte de Cabelo',
        preco: 18
      },
      pessoa: {
        nome: "Breno Costa",
        numero: "(37) 998215451"
      }
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
