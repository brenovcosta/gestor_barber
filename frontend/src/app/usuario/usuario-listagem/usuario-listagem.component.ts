import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../../model/pessoa.model";

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit {

  pessoas: Pessoa[] = [
    {
      id: 1,
      nome: "Breno",
      email: "breno@gmail.com",
      cpf: "16214040645",
      senha: "1234",
      tipo: "ADM"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
