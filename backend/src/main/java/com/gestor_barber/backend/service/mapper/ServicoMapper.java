package com.gestor_barber.backend.service.mapper;

import com.gestor_barber.backend.model.Servico;
import com.gestor_barber.backend.service.dto.ServicoDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ServicoMapper {

    ServicoDto toServicoDto (Servico servico);

    Servico toServico (ServicoDto servicoDto);

}
