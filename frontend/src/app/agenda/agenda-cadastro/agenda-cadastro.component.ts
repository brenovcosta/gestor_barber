import { Component, OnInit } from '@angular/core';
import {Agenda} from "../../model/agenda.model";
import {Router} from "@angular/router";
import {BlockUI, NgBlockUI} from "ng-block-ui";

@Component({
  selector: 'app-agenda-cadastro',
  templateUrl: './agenda-cadastro.component.html',
  styleUrls: ['./agenda-cadastro.component.css']
})
export class AgendaCadastroComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
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
      }
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancelar = () => {
    this.router.navigate(['/']);
  }

  limpar = () => {
    this.agenda = new Agenda();
  }

  salvar = () => {
    this.blockUI.start('Salvando..');
    this.blockUI.stop();
  }

}
