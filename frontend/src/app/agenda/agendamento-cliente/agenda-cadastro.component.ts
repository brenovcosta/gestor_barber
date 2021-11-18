import {Component, OnInit} from '@angular/core';
import {Agenda} from "../../model/agenda.model";
import {Router} from "@angular/router";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {finalize} from "rxjs/operators";
import {AgendaService} from "../../service/agenda.service";
import {SituacoesUtil} from "../../util/situacoes.util";
import {MessageService} from "primeng/api";
import {MessageUtil} from "../../util/message.util";

@Component({
  selector: 'app-agenda-cadastro',
  templateUrl: './agenda-cadastro.component.html',
  styleUrls: ['./agenda-cadastro.component.css']
})
export class AgendaCadastroComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  agenda = new Agenda();
  horarios: Agenda[] = [];
  horario = new Agenda();

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buscaDisponiveis();
  }

  buscaDisponiveis() {
    this.blockUI.start('Carregando...');
    this.agendaService.buscaDisponiveis()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) =>
          this.horarios = res
      , error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_HORARIOS_DISPONIVEIS}));
  }

  buscarServico = (id: number) => {
    this.blockUI.start('Buscando serviço..');
    this.agendaService.findById(id)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) =>
          this.agendar(res)
      ,error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_BUSCA_HORARIO}));
  }

  agendar = (horario: Agenda) => {
    this.agenda = horario;
    this.agenda.disponivel = SituacoesUtil.RESERVADO.descricao;
    this.blockUI.start('Agendando..');
    console.log(this.agenda)
    this.agendaService.agendar(this.agenda).pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
        this.buscaDisponiveis();
        this.messageService.add({severity: 'success', detail: MessageUtil.HORARIO_RESERVADO})
        }
        ,error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_BUSCA_HORARIO}));
  }

}
