package com.gestor_barber.backend.service.DTO;

import com.gestor_barber.backend.model.Pessoa;
import com.gestor_barber.backend.model.Servico;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AgendaDTO implements Serializable {

    private Long id;
    private Date inicio;
    private Date fim;
    private String situacao;
    private List<Pessoa> pessoas;
    private List<Servico> servicos;

}
