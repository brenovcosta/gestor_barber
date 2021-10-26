import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../../model/pessoa.model";
import {UsuarioService} from "../../service/usuario.service";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {finalize} from "rxjs/operators";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  pessoas: Pessoa[] = []

  constructor(
    private service: UsuarioService,
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

  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este usuário?',
      accept: () => {
        this.excluir(id);
      }
    });
  }

}
