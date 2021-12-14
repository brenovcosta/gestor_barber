import {Component, OnInit} from '@angular/core';
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
  pessoa = new Pessoa();

  constructor(
    private router: Router,
    private agendaService: AgendaService,
    private messageService: MessageService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.buscaDisponiveis();
    this.pessoa.email = this.obtemEmailLogado();
  }

  buscaDisponiveis() {
    this.blockUI.start('Carregando...');
    this.agendaService.buscaDisponiveis()
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
    this.blockUI.start('Buscando usuário...');
    this.usuarioService.findByEmail(this.pessoa)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
        this.agenda.pessoa = res;
      });

    this.agenda = horario;
    this.agenda.disponivel = SituacoesUtil.RESERVADO.descricao;
    console.log(this.agenda);
    this.blockUI.start('Agendando..');
    this.agendaService.agendar(this.agenda).pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
        this.buscaDisponiveis();
        this.messageService.add({severity: 'success', detail: MessageUtil.HORARIO_RESERVADO})
        }
        ,error => this.messageService.add({severity: 'error', detail: MessageUtil.ERRO_BUSCA_HORARIO}));
  }

  public obtemEmailLogado(): string {
    let email = localStorage.getItem('email');
    console.log(email);
    if (email != null){
      return email;
    }
    return '';
  }

}
