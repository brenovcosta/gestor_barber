package com.gestor_barber.backend.service.mapper;

import com.gestor_barber.backend.model.Agenda;
import com.gestor_barber.backend.model.Pessoa;
import com.gestor_barber.backend.service.dto.AgendaDTO;
import com.gestor_barber.backend.service.dto.PessoaDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface AgendaMapper {

    AgendaDTO toAgendaDTO (Agenda agenda);

    Agenda toAgenda (AgendaDTO agendaDTO);

}
