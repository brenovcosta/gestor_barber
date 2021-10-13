import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  exibe: boolean = false;

  abreFechaMenu() {
    this.exibe = !this.exibe;
  }

  items: MenuItem[] = [
    {
      label: 'Cadastros Principais',
      icon: 'pi pi-pw pi-cog',
      items: [{
        label: 'Usuários',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Cadastro de Usuários', icon: 'pi pi-fw pi-user-plus', routerLink: 'usuario/add'},
          {label: 'Listagem de Usuários', icon: 'pi pi-fw pi-users', routerLink: 'usuario'}
        ]
      },
      {
        label: 'Serviços',
        icon: 'pi pi-fw pi-user',
        items: [
          {label: 'Cadastro de Serviços', icon: 'pi pi-fw pi-plus', routerLink: 'servico/add'},
          {label: 'Listagem de Serviços', icon: 'pi pi-fw pi-list', routerLink: 'servico'}
        ]
      },
        {
          label: 'Horários',
          icon: 'pi pi-fw pi-calendar',
          items: [
            {label: 'Cadastro de Horários', icon: 'pi pi-fw pi-calendar-plus', routerLink: 'horario/add'},
            {label: 'Listagem de Horários', icon: 'pi pi-fw pi-list', routerLink: 'horario'}
          ]
        },

      ]
    },
    {
      label: 'Agenda',
      icon: 'pi pi-pw pi-calendar',
      items: [{
        label: 'Agendar Horário',
        icon: 'pi pi-fw pi-calendar-plus',
        routerLink: 'agenda/add'
      }
      ]
    },
  ];
}
