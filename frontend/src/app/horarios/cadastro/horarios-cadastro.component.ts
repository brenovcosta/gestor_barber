import {Component, OnInit} from '@angular/core';
import {MessageUtil} from "../../util/message.util";
import {ConstantesUtil} from "../../util/constantes.util";
import {Agenda} from "../../model/agenda.model";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Servico} from "../../model/servico.model";

@Component({
  selector: 'app-horarios-cadastro',
  templateUrl: './horarios-cadastro.component.html',
  styleUrls: ['./horarios-cadastro.component.css']
})
export class HorariosCadastroComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  agenda = new Agenda();
  servicos: Servico[] = [];
  servicoSelecionado = new Servico();

  constructor(
    private router: Router,
    private mensagemService: MessageService
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
    if(!this.checkFields()) return;
    this.blockUI.start('Salvando..');
    this.blockUI.stop();
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
    if(inicio > new Date()){
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
