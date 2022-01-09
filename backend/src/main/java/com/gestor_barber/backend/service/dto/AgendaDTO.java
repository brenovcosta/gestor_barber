package com.gestor_barber.backend.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class AgendaDTO {

    private Long id;
    private Date inicio;
    private Date fim;
    private String disponivel;
    private ServicoDTO servico;
    private PessoaDTO pessoa;

}
