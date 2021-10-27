package com.gestor_barber.backend.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ServicoDto implements Serializable {

    private Long id;
    private String nome;
    private String descricao;
    private float preco;

}
