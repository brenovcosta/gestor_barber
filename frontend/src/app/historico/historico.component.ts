import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {Agenda} from "../model/agenda.model";
import {Page} from "../util/page";
import {Pessoa} from "../model/pessoa.model";
import {Servico} from "../model/servico.model";
import {Router} from "@angular/router";
import {AgendaService} from "../service/agenda.service";
import {MessageService} from "primeng/api";
import {UsuarioService} from "../service/usuario.service";
import {ServicoService} from "../service/servico.service";
import {finalize} from "rxjs/operators";
import {MessageUtil} from "../util/message.util";
import {SituacoesUtil} from "../util/situacoes.util";

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  @ViewChild('tabela', {static: false}) table: Table | undefined;
  @BlockUI() blockUI!: NgBlockUI;
  agenda = new Agenda();
  horarios = new Page<Agenda>();
  horario = new Agenda();
  filtro = new Agenda();
  pessoa = new Pessoa();
  servicos: Servico[] = [];

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('reload') === "no"){
      localStorage.setItem('reload', "si");
      window.location.reload();
    }
    this.obtemEmailLogado();
    this.listarTodosServicos();
  }

  listarTodosServicos = () => {
    this.blockUI.start('Carregando..');
    this.servicoService.findAll()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.servicos = res;
      });
  }

  buscarHistorico(pessoa: Pessoa) {
    this.blockUI.start('Carregando...');
    this.filtro.pessoa = pessoa;
    if (this.filtro.pessoa == null){
      this.filtro.pessoa = new Pessoa();
    }
    this.agendaService.buscaDisponiveis(this.filtro, this.table)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) =>
          this.horarios = res
        , error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_CARREGAMENTO_HORARIOS}));
  }

  obtemEmailLogado() {
    let email = localStorage.getItem('email');
    if (email != null){
      this.pessoa.email = email;
      this.blockUI.start('Buscando usuário...');
      this.usuarioService.findByEmail(this.pessoa)
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe((res) => {
          this.filtro.pessoa = res;
          this.buscarHistorico(res)
        });
    }
  }

}
