import {Component, OnInit} from '@angular/core';
import {Agenda} from "../../model/agenda.model";
import {finalize} from "rxjs/operators";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {AgendaService} from "../../service/agenda.service";
import {MessageService} from "primeng/api";
import {SituacoesUtil} from "../../util/situacoes.util";
import {Servico} from "../../model/servico.model";
import {ServicoService} from "../../service/servico.service";
import {MessageUtil} from "../../util/message.util";
import {ConstantesUtil} from "../../util/constantes.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listagem',
  templateUrl: './horarios-listagem.component.html',
  styleUrls: ['./horarios-listagem.component.css']
})
export class HorariosListagemComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  display: boolean = false;
  servicos: Servico[] = [];
  servicoSelecionado = new Servico;
  agenda: Agenda = {} as Agenda;
  horarios: Agenda[] = [];

  constructor(
    private agendaService: AgendaService,
    private servicoService: ServicoService,
    private mensagemService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscaTodosHorarios();
  }

  buscaTodosHorarios = () => {
    this.blockUI.start('Carregando...');
    this.agendaService.findAll()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.horarios = res;
      });
  }

  excluir = (id: number) => {
    this.blockUI.start('Aguarde...');
    this.agendaService.delete(id)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(() => {
      this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O usuário foi excluido.'});
      this.buscaTodosHorarios();
      this.blockUI.stop();
    });
  }

  editar = (id: number) => {
    this.blockUI.start('Aguarde...');
    this.agendaService.findById(id)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.agenda = res;
        if (res != null) {
          if (res.disponivel === SituacoesUtil.INDISPONIVEL.descricao) {
            this.mensagemService.add({severity: 'error', summary: 'Erro!', detail: 'O horário não pode ser alterado pois já foi contratado.'});
          }else {
            console.log(res);
            console.log(this.agenda);
            this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'Edite os dados e clique em Salvar'});
            this.display = true;
            this.buscaServicos;
          }
        }
      });
  }

  buscaServicos = () => {
    this.blockUI.start('Carregando...');
    this.servicoService.findAll()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.servicos = res;
      });
  }

  cancelar = () => {
    this.display = false;
  }

  limpar = () => {
    this.agenda = new Agenda();
  }

  salvar = () => {
    if(!this.checkFields()) return;
    this.agenda.servico = this.servicoSelecionado;
    this.blockUI.start('Salvando..');
    this.agendaService.create(this.agenda )
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(() => {
        this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'Horário salvo com sucesso!'});
      });
  }

  private checkFields() {
    let { inicio, fim } = this.agenda;
    if (!inicio){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Inicio')));
      return false;
    }
    if (!fim){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Fim')));
      return false;
    }
    if(inicio < new Date()){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroData, ConstantesUtil.dataInvalida('Inicio')));
      return false;
    }
    if(inicio >= fim){
      this.mensagemService.add({severity:'error', summary: ConstantesUtil.erroData, detail: 'A data de fim não pode ser menor que a data de início!'});
      return false;
    }
    return true;
  }

}
