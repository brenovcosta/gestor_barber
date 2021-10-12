import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicoListagemComponent} from "./servico-listagem/servico-listagem.component";
import {ServicoCadastroComponent} from "./servico-cadastro/servico-cadastro.component";

const routes: Routes = [
  { path: "", component: ServicoListagemComponent },
  { path: "add", component: ServicoCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
