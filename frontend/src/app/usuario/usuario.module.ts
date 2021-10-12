import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuarioRoutingModule} from './usuario-routing.module';
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    DialogModule,
    TableModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
