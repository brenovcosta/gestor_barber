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
            " FROM Agenda a " +
            "WHERE (:#{#filtro.disponivel} is null or a.disponivel = :#{#filtro.disponivel}) " +
            "AND (:#{#filtro.inicio} is null or a.inicio >= :#{#filtro.inicio}) " +
            "AND (:#{#filtro.fim} is null or a.fim <= :#{#filtro.fim}) " +
            "AND (:#{#filtro.servico.id} is null or a.servico.id = :#{#filtro.servico.id})")
    Page<List<FiltroAgendaDTO>> buscarHorariosDisponiveis(@Param("filtro") AgendaDTO filtro, Pageable pageable);

    @Query("SELECT NEW com.gestor_barber.backend.service.dto.FiltroAgendaReservadosDTO(" +
            "a.id, a.inicio, a.fim, a.disponivel, a.servico, a.pessoa) " +
            "FROM Agenda a " +
            "WHERE (:#{#filtro.disponivel} is null or a.disponivel = :#{#filtro.disponivel}) " +
            "AND (:#{#filtro.inicio} is null or a.inicio >= :#{#filtro.inicio}) " +
            "AND (:#{#filtro.fim} is null or a.fim <= :#{#filtro.fim}) " +
            "AND (:#{#filtro.servico.id} is null or a.servico.id = :#{#filtro.servico.id})")
    Page<List<FiltroAgendaReservadosDTO>>buscarHorariosReservados(@Param("filtro") AgendaDTO filtro, Pageable pageable);

}
