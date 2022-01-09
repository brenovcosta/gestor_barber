import {Component, OnInit, ViewChild} from '@angular/core';
import {Agenda} from "../../model/agenda.model";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {MessageUtil} from "../../util/message.util";
import {AgendaService} from "../../service/agenda.service";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {MessageService} from "primeng/api";
import {SituacoesUtil} from "../../util/situacoes.util";
import {Table} from "primeng/table";
import {Page} from "../../util/page";
import {ServicoService} from "../../service/servico.service";
import {Servico} from "../../model/servico.model";

@Component({
  selector: 'app-agenda-listagem',
  templateUrl: './agenda-listagem.component.html',
  styleUrls: ['./agenda-listagem.component.css']
})
export class AgendaListagemComponent implements OnInit {

  @ViewChild('tabela', {static: false}) table: Table | undefined;
  @BlockUI() blockUI!: NgBlockUI;
  filtro = new Agenda();
  agenda = new Agenda();
  horarios = new Page<Agenda>();
  servicos: Servico[] = [];

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    public servicoService: ServicoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buscaHorariosReservados();
    this.listarTodosServicos();
  }

  buscaHorariosReservados() {
    this.blockUI.start('Carregando...');
    this.agenda.servico.id = 1;
    this.agendaService.buscaReservados(this.filtro, this.table)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res: Page<Agenda>) => {
        this.horarios = res;
      }, error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_CARREGAMENTO_HORARIOS}));
  }

  listarTodosServicos = () => {
    this.blockUI.start('Carregando..');
    this.servicoService.findAll()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.servicos = res;
      });
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
