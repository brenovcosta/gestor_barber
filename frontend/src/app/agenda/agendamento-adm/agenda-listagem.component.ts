import {Component, OnInit} from '@angular/core';
import {Agenda} from "../../model/agenda.model";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {MessageUtil} from "../../util/message.util";
import {AgendaService} from "../../service/agenda.service";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {MessageService} from "primeng/api";
import {SituacoesUtil} from "../../util/situacoes.util";

@Component({
  selector: 'app-agenda-listagem',
  templateUrl: './agenda-listagem.component.html',
  styleUrls: ['./agenda-listagem.component.css']
})
export class AgendaListagemComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  agenda = new Agenda();
  horarios: Agenda[] = [];

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buscaHorariosReservados();
  }

  buscaHorariosReservados() {
    this.blockUI.start('Carregando...');
    this.agendaService.buscaReservados()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
        this.horarios = res;
      }, error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_CARREGAMENTO_HORARIOS}));
  }

  buscarServico = (id: number) => {
    this.blockUI.start('Buscando serviço..');
    this.agendaService.findById(id)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) =>
          this.concluir(res)
        ,error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_BUSCA_HORARIO}));
  }

  concluir = (horario: Agenda) => {
    this.agenda = horario;
    this.agenda.disponivel = SituacoesUtil.CONCLUIDO.descricao;
    this.blockUI.start('Concluindo..');
    this.agendaService.agendar(this.agenda).pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
          this.buscaHorariosReservados();
          this.messageService.add({severity: 'success', detail: MessageUtil.HORARIO_RESERVADO})
        }
        ,error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_BUSCA_HORARIO}));
  }

}
