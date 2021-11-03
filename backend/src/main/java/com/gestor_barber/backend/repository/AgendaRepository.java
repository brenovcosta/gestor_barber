package com.gestor_barber.backend.repository;

import com.gestor_barber.backend.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {
}
