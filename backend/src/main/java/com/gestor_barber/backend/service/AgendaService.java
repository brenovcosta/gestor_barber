package com.gestor_barber.backend.service;

import com.gestor_barber.backend.model.Agenda;
import com.gestor_barber.backend.repository.AgendaRepository;
import com.gestor_barber.backend.service.dto.AgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaReservadosDTO;
import com.gestor_barber.backend.service.mapper.AgendaMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AgendaService {

    private final AgendaRepository agendaRepository;
    private final AgendaMapper agendaMapper;

    public AgendaDTO criar(AgendaDTO agendaDTO){
        Agenda agenda = agendaMapper.toAgenda(agendaDTO);
        return agendaMapper.toAgendaDTO(agendaRepository.save(agenda));
    }

    public List<AgendaDTO> buscarTodos(){
        return agendaRepository.findAll().stream().map(agendaMapper::toAgendaDTO).collect(Collectors.toList());
    }

    public AgendaDTO buscarPeloId(Long id) {
        Optional<Agenda> agenda = this.agendaRepository.findById(id);
        return agenda.map(agendaMapper::toAgendaDTO).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public AgendaDTO editar(AgendaDTO agendaDTO){
        Optional<Agenda> agenda = this.agendaRepository.findById(agendaDTO.getId());
        return agenda.map(value -> agendaMapper.toAgendaDTO(agendaRepository.save(agendaMapper.toAgenda(agendaDTO))))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void excluir(Long id){
        Agenda agenda = agendaRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        agendaRepository.delete(agenda);
    }

    public List<FiltroAgendaDTO> buscaDisponiveis(String situacao){
        return agendaRepository.buscarHorariosDisponiveis(situacao);
    }

    public List<FiltroAgendaReservadosDTO> buscaReservados(String situacao){
        return agendaRepository.buscarHorariosReservados(situacao);
    }

    public AgendaDTO agendar(AgendaDTO agendaDTO){
        Optional<Agenda> agenda = this.agendaRepository.findById(agendaDTO.getId());
        return agenda.map(value -> agendaMapper.toAgendaDTO(agendaRepository.save(agendaMapper.toAgenda(agendaDTO))))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

}