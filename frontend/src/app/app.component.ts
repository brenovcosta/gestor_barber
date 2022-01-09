import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  exibe: boolean = false;

  ngOnInit(): void {
    this.exibeMenuAdm();
    this.exibeTopBar();
  }

  exibeTopBar(): boolean{
    return localStorage.getItem('isLoggedIn') == "true";
  }

  exibeMenuAdm(): boolean{
    return localStorage.getItem('tipo') == "ADMINISTRADOR" || localStorage.getItem('tipo') == "FUNCIONARIO";
  }

  abreFechaMenu() {
    this.exibe = !this.exibe;
  }

  items: MenuItem[] = [
    {
      label: 'Cadastros Principais',
      icon: 'pi pi-pw pi-cog',
      visible: this.exibeMenuAdm(),
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
            {label: 'Listagem de Horários', icon: 'pi pi-fw pi-list', routerLink: 'horario'},
          ]
        },
      ]
    },
    {
      label: 'Agenda e Relatórios',
      icon: 'pi pi-pw pi-cog',
      visible: this.exibeMenuAdm(),
      items: [
        {
          label: 'Agenda',
          icon: 'pi pi-fw pi-calendar',
          routerLink: 'agenda'
        },
        {
          label: 'Relatório de Vendas',
          icon: 'pi pi-fw pi-file-pdf',
          routerLink: 'relatorio'
        },
      ]
    },
    {
      label: 'Editar dados',
      icon: 'pi pi-fw pi-user-edit',
      routerLink: 'edit'
    },
    {
      label: 'Horários Disponíveis',
      icon: 'pi pi-fw pi-calendar-plus',
      routerLink: 'agenda/add'
    },
    {
      label: 'Histórico de Agendamentos',
      icon: 'pi pi-fw pi-list',
      routerLink: 'agenda/add'
    },
    {
      label: 'Sair',
      icon: 'pi pi-pw pi-sign-out',
      routerLink: 'logout'
    }
  ];
}
