import {Component, OnInit, ViewChild} from '@angular/core';
import {Agenda} from "../../model/agenda.model";
import {Router} from "@angular/router";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {finalize} from "rxjs/operators";
import {AgendaService} from "../../service/agenda.service";
import {SituacoesUtil} from "../../util/situacoes.util";
import {MessageService} from "primeng/api";
import {MessageUtil} from "../../util/message.util";
import {UsuarioService} from "../../service/usuario.service";
import {Pessoa} from "../../model/pessoa.model";
import {Table} from "primeng/table";
import {Page} from "../../util/page";
import {Servico} from "../../model/servico.model";
import {ServicoService} from "../../service/servico.service";

@Component({
  selector: 'app-agenda-cadastro',
  templateUrl: './agenda-cadastro.component.html',
  styleUrls: ['./agenda-cadastro.component.css']
})
export class AgendaCadastroComponent implements OnInit {

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
    public servicoService: ServicoService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('reload') === "no"){
      localStorage.setItem('reload', "si");
      window.location.reload();
    }
    this.buscaDisponiveis();
    this.listarTodosServicos();
    this.obtemEmailLogado();
  }

  listarTodosServicos = () => {
    this.blockUI.start('Carregando..');
    this.servicoService.findAll()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.servicos = res;
      });
  }

  buscaDisponiveis() {
    this.blockUI.start('Carregando...');
    this.agendaService.buscaDisponiveis(this.filtro, this.table)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) =>
          this.horarios = res
      , error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_CARREGAMENTO_HORARIOS}));
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
    this.agenda.pessoa = this.pessoa;
    this.blockUI.start('Agendando..');
    this.agendaService.agendar(this.agenda).pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
        this.buscaDisponiveis();
        this.messageService.add({severity: 'success', detail: MessageUtil.HORARIO_RESERVADO})
        }
        ,error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_BUSCA_HORARIO}));
  }

  obtemEmailLogado() {
    let email = localStorage.getItem('email');
    if (email != null){
      this.pessoa.email = email;
      this.blockUI.start('Buscando usuário...');
      this.usuarioService.findByEmail(this.pessoa)
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe((res) => {
          this.pessoa = res;
        });
    }
  }

}
