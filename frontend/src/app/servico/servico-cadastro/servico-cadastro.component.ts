import {Component, OnInit} from '@angular/core';
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {Pessoa} from "../../model/pessoa.model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {MessageUtil} from "../../util/message.util";
import {ConstantesUtil} from "../../util/constantes.util";
import {Servico} from "../../model/servico.model";
import {ServicoService} from "../../service/servico.service";

@Component({
  selector: 'app-servico-cadastro',
  templateUrl: './servico-cadastro.component.html',
  styleUrls: ['./servico-cadastro.component.css']
})
export class ServicoCadastroComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  servico = new Servico();

  constructor(
    private router: Router,
    private service: ServicoService,
    private mensagemService: MessageService
  ) { }

  ngOnInit(): void {
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
      this.mensagemService.add({severity:'success', summary: 'Sucesso!', detail: 'O serviço foi inserido.'});
      this.blockUI.stop();
    });
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
