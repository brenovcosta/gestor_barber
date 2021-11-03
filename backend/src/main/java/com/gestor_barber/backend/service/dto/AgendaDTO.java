package com.gestor_barber.backend.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AgendaDTO {

    private Long id;
    private Date inicio;
    private Date fim;
    private String disponivel;
    private ServicoDTO servico;
    private PessoaDTO pessoa;

}
