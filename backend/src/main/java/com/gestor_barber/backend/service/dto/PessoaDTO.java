package com.gestor_barber.backend.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PessoaDTO implements Serializable {

    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String tipo;
    private String numero;

}
