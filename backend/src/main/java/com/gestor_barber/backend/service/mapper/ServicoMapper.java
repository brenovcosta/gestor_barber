package com.gestor_barber.backend.service.mapper;

import com.gestor_barber.backend.model.Servico;
import com.gestor_barber.backend.service.dto.ServicoDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ServicoMapper {

    ServicoDTO toServicoDto (Servico servico);

    Servico toServico (ServicoDTO servicoDto);

}
