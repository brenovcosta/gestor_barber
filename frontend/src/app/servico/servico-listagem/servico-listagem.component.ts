import { Component, OnInit } from '@angular/core';
import {Servico} from "../../model/servico.model";
import {finalize} from "rxjs/operators";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {ServicoService} from "../../service/servico.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Pessoa} from "../../model/pessoa.model";
import {Router} from "@angular/router";
import {MessageUtil} from "../../util/message.util";
import {ConstantesUtil} from "../../util/constantes.util";

@Component({
  selector: 'app-servico-listagem',
  templateUrl: './servico-listagem.component.html',
  styleUrls: ['./servico-listagem.component.css']
})
export class ServicoListagemComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  servicos: Servico[] = []
  servico = new Servico();
  display: boolean = false;

  constructor(
    private service: ServicoService,
    private router: Router,
    private mensagemService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos = () => {
    this.blockUI.start('Carregando..');
    this.service.findAll()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(res => {
        this.servicos = res;
      });
  }

  confirm = (id: number) => {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este serviço?',
      accept: () => {
        this.excluir(id);
      }
    });
  }

  excluir = (id: number) => {
    this.blockUI.start('Carregando..');
    this.service.delete(id).pipe(finalize(() => this.blockUI.stop()))
      .subscribe(() =>
        this.mensagemExclusao()
      ,error => this.mensagemService.add({severity: 'error', detail: MessageUtil.ERRO_SERVICO_RELACIONADO}));
  }

  mensagemExclusao(){
    this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O serviço foi excluido.'})
    this.listarTodos();
  }

  editar = (id: number) => {
    this.service.findById(id).subscribe((res) => {
      if(res !== null){
        this.display = true;
        this.servico = res;
        this.mensagemService.add({severity:'warn', summary: 'Sucesso!', detail: 'Edite os dados e clique em Salvar'});
      }else{
        this.mensagemService.add({severity:'errors', summary: 'Erro!', detail: 'Erro ao requisitar atualização do serviço'});
      }
    }, erro => {
      this.mensagemService.add({severity:'errors', summary: 'Erro!', detail: 'Erro ao requisitar atualização do serviço'});
    })
  }

  cancelar = () => {
    this.router.navigate(['/']);
  }

  limpar = () => {
    this.servico = new Pessoa();
  }

  salvar = () => {
    if(!this.checkFields()) return;
    this.blockUI.start('Salvando..');
    this.service.create(this.servico).subscribe(() => {
      this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O serviço foi alterado.'});
      this.listarTodos();
      this.display = false;
    });
    this.blockUI.stop();
  }

  private checkFields() {
    let { nome, preco } = this.servico;
    if (!nome){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Nome')));
      return false;
    }
    if (!preco){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Preço')));
      return false;
    }
    if(nome.length < 5 || 50 < nome.length){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroTamanho, ConstantesUtil.campo('Nome', 5, 50)));
      return false;
    }
    if(preco <= 0){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.formatoInvalido, ConstantesUtil.campoInvalido('Preço')));
      return false;
    }
    return true;
  }

}
