package com.gestor_barber.backend.repository;

import com.gestor_barber.backend.model.Agenda;
import com.gestor_barber.backend.service.dto.FiltroAgendaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    @Query("SELECT NEW com.gestor_barber.backend.service.dto.FiltroAgendaDTO(a.id, a.inicio, a.fim, a.disponivel, a.servico) FROM Agenda a WHERE a.disponivel LIKE :situacao")
    List<FiltroAgendaDTO> buscarHorariosDisponiveis(@Param("situacao") String situacao);


}
