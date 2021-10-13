import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "usuario", loadChildren: () => import('./usuario/usuario.module').then(module => module.UsuarioModule) },
  { path: "servico", loadChildren: () => import('./servico/servico.module').then(module => module.ServicoModule) },
  { path: "horario", loadChildren: () => import('./horarios/horarios.module').then(module => module.HorariosModule) },
  { path: "agenda", loadChildren: () => import('./agenda/agenda.module').then(module => module.AgendaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
