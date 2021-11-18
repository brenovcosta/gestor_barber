package com.gestor_barber.backend.service.dto;

import com.gestor_barber.backend.model.Pessoa;
import com.gestor_barber.backend.model.Servico;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FiltroAgendaReservadosDTO {

    private Long id;
    private Date inicio;
    private Date fim;
    private String disponivel;
    private ServicoDTO servico;
    private PessoaDTO pessoa;

    public FiltroAgendaReservadosDTO(Long id, Date inicio, Date fim, String disponivel, Servico servico, Pessoa pessoa){
        this.id = id;
        this.inicio = inicio;
        this.fim = fim;
        this.disponivel = disponivel;
        this.servico = toServicoDto(servico);
        this.pessoa = toPessoaDto(pessoa);
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

    public PessoaDTO toPessoaDto(Pessoa pessoa) {
        if ( pessoa == null ) {
            return null;
        }

        PessoaDTO pessoaDTO = new PessoaDTO();

        pessoaDTO.setId( pessoa.getId() );
        pessoaDTO.setNome( pessoa.getNome() );
        pessoaDTO.setEmail( pessoa.getEmail() );
        pessoaDTO.setSenha( pessoa.getSenha() );
        pessoaDTO.setCpf( pessoa.getCpf() );
        pessoaDTO.setTipo( pessoa.getTipo() );
        pessoaDTO.setNumero( pessoa.getNumero() );

        return pessoaDTO;
    }

}
