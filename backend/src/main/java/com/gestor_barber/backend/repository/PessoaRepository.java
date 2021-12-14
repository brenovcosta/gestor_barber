package com.gestor_barber.backend.repository;

import com.gestor_barber.backend.model.Pessoa;
import com.gestor_barber.backend.service.dto.PessoaDTO;
import com.gestor_barber.backend.service.dto.PessoaLoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    @Query("SELECT NEW com.gestor_barber.backend.service.dto.PessoaLoginDTO" +
            "(p.id, p.nome, p.email, p.senha, p.cpf, p.tipo, p.numero)" +
            " FROM Pessoa p WHERE p.email = :#{#pessoaDTO.email} ")
    PessoaLoginDTO login(@Param("pessoaDTO") PessoaDTO pessoaDTO);

}
