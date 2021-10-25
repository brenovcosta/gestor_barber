package com.gestor_barber.backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "agenda")
public class Agenda implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "inicio", nullable = false)
    private Date inicio;

    @Column(name = "fim", nullable = false)
    private Date fim;

    @Column(name = "situacao", nullable = false)
    private String situacao;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pessoa")
    private List<Pessoa> pessoas;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servico")
    private List<Servico> servicos;

}
