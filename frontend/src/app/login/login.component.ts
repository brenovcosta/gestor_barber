import {Component, OnInit} from '@angular/core';
import {Pessoa} from "../model/pessoa.model";
import {UsuarioService} from "../service/usuario.service";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {MessageUtil} from "../util/message.util";
import {ConstantesUtil} from "../util/constantes.util";
import {MessageService} from "primeng/api";
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Pessoa();
  @BlockUI() blockUI!: NgBlockUI;

  constructor(
    private usuarioService: UsuarioService,
    private mensagemService: MessageService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    if (!this.checkFields()) return;
    this.blockUI.start('');
    this.usuarioService.findByEmail(this.usuario)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe((res) => {
        if (res.email && res.senha === this.usuario.senha) {
          this.usuario = res;
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('email', this.usuario.email);
          localStorage.setItem('nome', this.usuario.nome);
          localStorage.setItem('tipo', this.usuario.tipo ? this.usuario.tipo : '');
          this.route.navigate(['/']);
        } else {
          this.mensagemService.add({severity: 'error', detail: 'Tente novamente!'});
        }
      });
  }

  private checkFields() {
    let {email, senha} = this.usuario;
    if (!email) {
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Nome')));
      return false;
    }
    if (!senha) {
      this.mensagemService.add(MessageUtil.erroToast(ConstantesUtil.erroObrigatorio, ConstantesUtil.campoObrigatorio('Senha')));
      return false;
    }
    return true;
  }
}
