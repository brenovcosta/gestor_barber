import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {Pessoa} from "../../model/pessoa.model";
import {TiposUtil} from "../../util/tipos.util";
import {Tipo} from "../../model/tipo.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {MessageUtil} from "../../util/message.util";
import {ConstantesUtil} from "../../util/constantes.util";
import {UsuarioService} from "../../service/usuario.service";

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  @Input() pessoa = new Pessoa();
  display!: boolean;
  tipos = TiposUtil.tipos;
  tipo: Tipo = {
    id: "CLIENTE"
  };

  constructor(
    private service: UsuarioService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private mensagemService: MessageService
  ) { }

  ngOnInit(): void {
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
        this.confirm();
        this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O usuário foi inserido.'});
        this.blockUI.stop();
        this.display = false;
      });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Deseja cadastrar outro usuário?',
      accept: () => {
        this.router.navigate(['usuario/add']);
      },
      reject: () => {
        this.router.navigate(['usuario']);
      }
    });
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
