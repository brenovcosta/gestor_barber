package com.gestor_barber.backend.repository;

import com.gestor_barber.backend.model.Agenda;
import com.gestor_barber.backend.service.dto.AgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaReservadosDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    @Query("SELECT NEW com.gestor_barber.backend.service.dto.FiltroAgendaDTO(" +
            "a.id, a.inicio, a.fim, a.disponivel, a.servico)" +
            " FROM Agenda a WHERE a.disponivel = :situacao")
    List<FiltroAgendaDTO> buscarHorariosDisponiveis(@Param("situacao") String situacao);

    @Query("SELECT NEW com.gestor_barber.backend.service.dto.FiltroAgendaReservadosDTO(" +
            "a.id, a.inicio, a.fim, a.disponivel, a.servico, a.pessoa)" +
            " FROM Agenda a WHERE a.disponivel = :situacao")
    Page<List<FiltroAgendaReservadosDTO>>buscarHorariosReservados(@Param("situacao") String situacao, Pageable pageable);

    @Query("SELECT NEW com.gestor_barber.backend.service.dto.FiltroAgendaReservadosDTO(a.id, a.inicio, a.fim, a.disponivel, a.servico, a.pessoa) " +
            "FROM Agenda a " +
            "WHERE a.inicio >= :#{#filtro.inicio} " +
            "AND a.fim <= :#{#filtro.fim}")
    List<FiltroAgendaReservadosDTO> buscarHorariosPorData(@Param("filtro") AgendaDTO filtro);


}
