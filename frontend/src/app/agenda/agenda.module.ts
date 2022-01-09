import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgendaRoutingModule} from './agenda-routing.module';
import {AgendaCadastroComponent} from './agendamento-cliente/agenda-cadastro.component';
import {AgendaListagemComponent} from './agendamento-adm/agenda-listagem.component';
import {ToastModule} from "primeng/toast";
import {BlockUIModule} from "ng-block-ui";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    AgendaCadastroComponent,
    AgendaListagemComponent
  ],
    imports: [
        CommonModule,
        ToastModule,
        BlockUIModule.forRoot(),
        DropdownModule,
        ButtonModule,
        TableModule,
        DialogModule,
        AgendaRoutingModule,
        RadioButtonModule,
        CalendarModule,
        FormsModule,
        ToolbarModule
    ]
})
export class AgendaModule { }
