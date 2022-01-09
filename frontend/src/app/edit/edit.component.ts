import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../model/pessoa.model";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {UsuarioService} from "../service/usuario.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {MessageUtil} from "../util/message.util";
import {ConstantesUtil} from "../util/constantes.util";
import {TiposUtil} from "../util/tipos.util";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  pessoa = new Pessoa();

  constructor(
    private route: Router,
    private usuarioService: UsuarioService,
    private mensagemService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.obtemEmailLogado();
  }

  cancelar(){
    this.route.navigate(["agenda/add"])
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Dados alterados com sucesso!',
      rejectVisible: false,
      acceptLabel: "OK",
      accept: () => {
        this.route.navigate(['login'])
      }
    });
  }

  salvar = () => {
    if(!this.checkFields()) return;
    this.blockUI.start('Salvando..');
    this.pessoa.tipo = TiposUtil.CLIENTE.id;
    this.usuarioService.create(this.pessoa).subscribe(() => {
      this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O usuário foi alterado.'});
      this.confirm();
    });
    this.blockUI.stop();
  }

  obtemEmailLogado() {
    let email = localStorage.getItem('email');
    if (email != null){
      this.pessoa.email = email;
      this.blockUI.start('Buscando usuário...');
      this.usuarioService.findByEmail(this.pessoa)
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe((res) => {
          res.senha = '';
          this.pessoa = res;
        });
    }
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
