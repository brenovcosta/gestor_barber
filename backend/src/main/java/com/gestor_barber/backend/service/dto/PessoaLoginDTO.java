package com.gestor_barber.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class PessoaLoginDTO implements Serializable {

    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String tipo;
    private String numero;

}
