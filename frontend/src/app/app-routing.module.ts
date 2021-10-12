import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "usuario", loadChildren: () => import('./usuario/usuario.module').then(module => module.UsuarioModule) },
  { path: "servico", loadChildren: () => import('./servico/servico.module').then(module => module.ServicoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
