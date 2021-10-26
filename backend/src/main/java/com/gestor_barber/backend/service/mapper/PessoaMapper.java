package com.gestor_barber.backend.service.mapper;

import com.gestor_barber.backend.model.Pessoa;
import com.gestor_barber.backend.service.dto.PessoaDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface PessoaMapper {

    PessoaDTO toPessoaDto (Pessoa pessoa);

    Pessoa toPessoa (PessoaDTO pessoaDTO);

}
