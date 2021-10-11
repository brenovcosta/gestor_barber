import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioListagemComponent} from "./usuario-listagem/usuario-listagem.component";
import {UsuarioCadastroComponent} from "./usuario-cadastro/usuario-cadastro.component";

const routes: Routes = [
  { path: "", component: UsuarioListagemComponent },
  { path: "add", component: UsuarioCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
