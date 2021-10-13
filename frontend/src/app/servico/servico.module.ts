import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServicoRoutingModule} from './servico-routing.module';
import {ServicoCadastroComponent} from './servico-cadastro/servico-cadastro.component';
import {ServicoListagemComponent} from './servico-listagem/servico-listagem.component';
import {ToastModule} from "primeng/toast";
import {BlockUIModule} from "ng-block-ui";
import {InputMaskModule} from "primeng/inputmask";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    ServicoCadastroComponent,
    ServicoListagemComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    BlockUIModule.forRoot(),
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TableModule,
    InputNumberModule,
    InputTextareaModule,
    ToolbarModule,
    ServicoRoutingModule,
    FormsModule
  ]
})
export class ServicoModule { }
