import { Component, OnInit } from '@angular/core';
import {Agenda} from "../../model/agenda.model";

@Component({
  selector: 'app-listagem',
  templateUrl: './horarios-listagem.component.html',
  styleUrls: ['./horarios-listagem.component.css']
})
export class HorariosListagemComponent implements OnInit {

  horarios: Agenda[] = [
    {
      id: 1,
      fim: new Date(),
      inicio: new Date()
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
