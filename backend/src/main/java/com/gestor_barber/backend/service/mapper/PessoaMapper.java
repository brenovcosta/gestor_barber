package com.gestor_barber.backend.service.mapper;

import com.gestor_barber.backend.model.Pessoa;
import com.gestor_barber.backend.service.DTO.PessoaDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface PessoaMapper {

    PessoaDTO toPessoaDTO(Pessoa cidade);

    Pessoa toPessoa(PessoaDTO cidadeDTO);

}
