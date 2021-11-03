package com.gestor_barber.backend.service;

import com.gestor_barber.backend.model.Servico;
import com.gestor_barber.backend.repository.ServicoRepository;
import com.gestor_barber.backend.service.dto.ServicoDTO;
import com.gestor_barber.backend.service.mapper.ServicoMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;
    private final ServicoMapper servicoMapper;

    public ServicoDTO criar(ServicoDTO servicoDto){
        Servico servico = servicoMapper.toServico(servicoDto);
        return servicoMapper.toServicoDto(servicoRepository.save(servico));
    }

    public List<ServicoDTO> buscarTodos(){
        return servicoRepository.findAll().stream().map(servicoMapper::toServicoDto).collect(Collectors.toList());
    }

    public ServicoDTO buscarPeloId(Long id) {
        Optional<Servico> servico = this.servicoRepository.findById(id);
        return servico.map(servicoMapper::toServicoDto).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public ServicoDTO editar(ServicoDTO servicoDto){
        Optional<Servico> servico = this.servicoRepository.findById(servicoDto.getId());
        return servico.map(value -> servicoMapper.toServicoDto(servicoRepository.save(servicoMapper.toServico(servicoDto))))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void excluir(Long id){
        Servico servico = servicoRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        servicoRepository.delete(servico);
    }

}
