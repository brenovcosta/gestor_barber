import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./login/login.component";
import {UsuarioCadastroComponent} from "./usuario/usuario-cadastro/usuario-cadastro.component";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "login", component: LoginComponent },
  { path: "cadastro", component: UsuarioCadastroComponent },
  { path: "usuario", loadChildren: () => import('./usuario/usuario.module').then(module => module.UsuarioModule) },
  { path: "servico", loadChildren: () => import('./servico/servico.module').then(module => module.ServicoModule),
    canActivate: [AuthGuard] },
  { path: "horario", loadChildren: () => import('./horarios/horarios.module').then(module => module.HorariosModule),
    canActivate: [AuthGuard] },
  { path: "agenda", loadChildren: () => import('./agenda/agenda.module').then(module => module.AgendaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
