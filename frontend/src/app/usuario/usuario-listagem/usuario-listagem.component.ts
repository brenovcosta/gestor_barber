import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../../model/pessoa.model";
import {UsuarioService} from "../../service/usuario.service";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {finalize} from "rxjs/operators";
import {ConfirmationService, MessageService} from "primeng/api";
import {TiposUtil} from "../../util/tipos.util";
import {Router} from "@angular/router";
import {MessageUtil} from "../../util/message.util";
import {ConstantesUtil} from "../../util/constantes.util";
import {Tipo} from "../../model/tipo.model";

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  tipos = TiposUtil.tipos;
  pessoas: Pessoa[] = []
  display: boolean = false;
  pessoa = new Pessoa();
  tipo: Tipo = {};

  constructor(
    private service: UsuarioService,
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
      .subscribe(pessoa => {
        this.pessoas = pessoa;
      });
  }

  excluir = (id: number) => {
    this.blockUI.start('Carregando..');
    this.service.delete(id).subscribe(() => {
      this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O usuário foi excluido.'});
      this.listarTodos();
      this.blockUI.stop();
    });
  }

  editar = (id: number) => {
    this.service.findById(id).subscribe((resposta) => {
      if(resposta !== null){
        this.display = true;
        this.pessoa = resposta;
        this.tipo.id = this.pessoa.tipo;
        this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'Edite os dados e clique em atualizar'});
      }else{
        this.mensagemService.add({severity:'errors', summary: 'Erro!', detail: 'Erro ao requisitar atualização do usuário'});
      }
    }, erro => {
      this.mensagemService.add({severity:'errors', summary: 'Erro!', detail: 'Erro ao requisitar atualização do usuário'});
    })

  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este usuário?',
      accept: () => {
        this.excluir(id);
      }
    });
  }

  cancelar = () => {
    this.router.navigate(['/']);
  }

  limpar = () => {
    this.pessoa = new Pessoa();
  }

  salvar = () => {
    if(!this.checkFields()) return;
    this.blockUI.start('Salvando..');
    this.pessoa.tipo = this.tipo.id;
    this.service.create(this.pessoa).subscribe(() => {
      this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O usuário foi alterado.'});
      this.listarTodos();
      this.display = false;
    });
    this.blockUI.stop();
  }

  private checkFields() {
    let { nome, email, numero, cpf, senha } = this.pessoa;
    if (!nome){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Nome')));
      return false;
    }
    if (!email){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Email')));
      return false;
    }
    if (!senha){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Senha')));
      return false;
    }
    if (!numero){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Número')));
      return false;
    }
    if (!cpf){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('CPF')));
      return false;
    }
    if(nome.length < 5 || 50 < nome.length){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroTamanho, ConstantesUtil.campo('Nome', 5, 100)));
      return false;
    }
    if(email.length < 5 || 50 < email.length){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroTamanho, ConstantesUtil.campo('Email', 5, 100)));
      return false;
    }
    if (senha.length < 8 || senha.length > 20){
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroTamanho, ConstantesUtil.campo('Senha', 8, 20)));
      return false;
    }
    return true;
  }

}
