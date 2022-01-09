import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {Agenda} from "../model/agenda.model";
import {Page} from "../util/page";
import {Servico} from "../model/servico.model";
import {Router} from "@angular/router";
import {AgendaService} from "../service/agenda.service";
import {ServicoService} from "../service/servico.service";
import {MessageService} from "primeng/api";
import {finalize} from "rxjs/operators";
import {MessageUtil} from "../util/message.util";
import {SituacoesUtil} from "../util/situacoes.util";
import {ExportacaoUtil} from "../util/ExportacaoUtil";

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
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
    this.buscaHorariosConcluidos();
    this.listarTodosServicos();
  }

  buscaHorariosConcluidos() {
    this.blockUI.start('Carregando...');
    this.filtro.disponivel = SituacoesUtil.CONCLUIDO.descricao;
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

  exportPdf(): void {
    this.blockUI.start("Gerando arquivo...");
    this.agendaService.gerarRelatorioPdf(this.horarios.content)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((arquivo) => {
        ExportacaoUtil.download(arquivo, 'pdf', `Relatório de vendas.pdf`);
      });
  }

}
