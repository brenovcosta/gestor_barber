import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgendaListagemComponent} from "./agenda-listagem/agenda-listagem.component";
import {AgendaCadastroComponent} from "./agenda-cadastro/agenda-cadastro.component";

const routes: Routes = [
  { path: "", component: AgendaListagemComponent },
  { path: "add", component: AgendaCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
