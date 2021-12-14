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
import {ConfirmationService, MessageService} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioService} from "./service/usuario.service";
import {ServicoModule} from "./servico/servico.module";
import {HorariosModule} from "./horarios/horarios.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PasswordModule} from "primeng/password";
import {AuthGuard} from "./auth/auth.guard";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioCadastroComponent,
    UsuarioListagemComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuarioModule,
    ServicoModule,
    DropdownModule,
    InputMaskModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SidebarModule,
    PanelMenuModule,
    ToastModule,
    InputNumberModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ConfirmDialogModule,
    PasswordModule,
    DialogModule,
    TableModule,
    HorariosModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    MessageService,
    UsuarioService,
    HttpClient,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
