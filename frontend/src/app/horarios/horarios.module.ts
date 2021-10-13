import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { HorariosCadastroComponent } from './cadastro/horarios-cadastro.component';
import { HorariosListagemComponent } from './listagem/horarios-listagem.component';
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";
import {BlockUIModule} from "ng-block-ui";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HorariosCadastroComponent,
    HorariosListagemComponent
  ],
    imports: [
        CommonModule,
        ToastModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        ToolbarModule,
        DialogModule,
        TableModule,
        BlockUIModule.forRoot(),
        HorariosRoutingModule,
        FormsModule
    ]
})
export class HorariosModule { }
