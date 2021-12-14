package com.gestor_barber.backend.service;

import com.gestor_barber.backend.model.Pessoa;
import com.gestor_barber.backend.repository.PessoaRepository;
import com.gestor_barber.backend.service.dto.PessoaDTO;
import com.gestor_barber.backend.service.dto.PessoaLoginDTO;
import com.gestor_barber.backend.service.mapper.PessoaMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    private final PessoaMapper pessoaMapper;

    public PessoaLoginDTO login(PessoaDTO pessoaDTO){
        return pessoaRepository.login(pessoaDTO);
    }

    public PessoaDTO criar(PessoaDTO pessoaDTO){
        Pessoa pessoa = pessoaMapper.toPessoa(pessoaDTO);
        return pessoaMapper.toPessoaDto(pessoaRepository.save(pessoa));
    }

    public List<PessoaDTO> buscarTodos(){
        return pessoaRepository.findAll().stream().map(pessoaMapper::toPessoaDto).collect(Collectors.toList());
    }

    public PessoaDTO buscarPeloId(Long id) {
        Optional<Pessoa> pessoa = this.pessoaRepository.findById(id);
        return pessoa.map(pessoaMapper::toPessoaDto).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public PessoaDTO editar(PessoaDTO pessoaDTO){
        Optional<Pessoa> cidade = this.pessoaRepository.findById(pessoaDTO.getId());
        return cidade.map(value -> pessoaMapper.toPessoaDto(pessoaRepository.save(pessoaMapper.toPessoa(pessoaDTO))))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void excluir(Long id){
        Pessoa pessoa = pessoaRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        pessoaRepository.delete(pessoa);
    }

}
