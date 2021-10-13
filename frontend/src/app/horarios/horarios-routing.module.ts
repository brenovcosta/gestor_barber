import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HorariosCadastroComponent} from "./cadastro/horarios-cadastro.component";
import {HorariosListagemComponent} from "./listagem/horarios-listagem.component";

const routes: Routes = [
  { path: "", component: HorariosListagemComponent },
  { path: "add", component: HorariosCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
