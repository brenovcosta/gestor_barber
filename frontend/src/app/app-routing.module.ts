import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./login/login.component";
import {UsuarioCadastroComponent} from "./usuario/usuario-cadastro/usuario-cadastro.component";
import {LogoutComponent} from "./logout/logout.component";
import {RelatorioComponent} from "./relatorio/relatorio.component";
import {EditComponent} from "./edit/edit.component";
import {HistoricoComponent} from "./historico/historico.component";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "cadastro", component: UsuarioCadastroComponent },
  { path: "edit", component: EditComponent },
  { path: "historico", component: HistoricoComponent },
  { path: "relatorio", component: RelatorioComponent, canActivate: [AuthGuard] },
  { path: "usuario", loadChildren: () => import('./usuario/usuario.module').then(module => module.UsuarioModule),
    canActivate: [AuthGuard] },
  { path: "servico", loadChildren: () => import('./servico/servico.module').then(module => module.ServicoModule),
    canActivate: [AuthGuard] },
  { path: "horario", loadChildren: () => import('./horarios/horarios.module').then(module => module.HorariosModule),
    canActivate: [AuthGuard] },
  { path: "agenda", loadChildren: () => import('./agenda/agenda.module').then(module => module.AgendaModule),
    canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
