import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SidebarModule} from "primeng/sidebar";
import {PanelMenuModule} from "primeng/panelmenu";
import {UsuarioCadastroComponent} from "./usuario/usuario-cadastro/usuario-cadastro.component";
import {UsuarioListagemComponent} from './usuario/usuario-listagem/usuario-listagem.component';
import {ToastModule} from "primeng/toast";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {BlockUIModule} from "ng-block-ui";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    UsuarioCadastroComponent,
    UsuarioListagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SidebarModule,
    PanelMenuModule,
    ToastModule,
    InputNumberModule,
    BlockUIModule.forRoot(),
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
