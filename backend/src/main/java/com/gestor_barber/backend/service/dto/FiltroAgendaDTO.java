package com.gestor_barber.backend.service.dto;

import com.gestor_barber.backend.model.Servico;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FiltroAgendaDTO {

    private Long id;
    private Date inicio;
    private Date fim;
    private String disponivel;
    private ServicoDTO servico;

    public FiltroAgendaDTO(Long id, Date inicio, Date fim, String disponivel, Servico servico){
        this.id = id;
        this.inicio = inicio;
        this.fim = fim;
        this.disponivel = disponivel;
        this.servico = toServicoDto(servico);
    }

    public ServicoDTO toServicoDto(Servico servico) {
        if ( servico == null ) {
            return null;
        }

        ServicoDTO servicoDTO = new ServicoDTO();

        servicoDTO.setId( servico.getId() );
        servicoDTO.setNome( servico.getNome() );
        servicoDTO.setDescricao( servico.getDescricao() );
        servicoDTO.setPreco( servico.getPreco() );

        return servicoDTO;
    }

}
