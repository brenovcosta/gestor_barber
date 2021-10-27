package com.gestor_barber.backend.resource;

import com.gestor_barber.backend.service.PessoaService;
import com.gestor_barber.backend.service.ServicoService;
import com.gestor_barber.backend.service.dto.PessoaDTO;
import com.gestor_barber.backend.service.dto.ServicoDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/servico")
public class ServicoResource {

    private ServicoService service;

    @GetMapping
    public ResponseEntity<List<ServicoDto>> bucarTodos() {
        return new ResponseEntity<>(service.buscarTodos(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ServicoDto> criar(@RequestBody ServicoDto servicoDto){
        return new ResponseEntity<>(service.criar(servicoDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServicoDto> buscarPeloId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPeloId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        service.excluir(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<ServicoDto> editar(@RequestBody ServicoDto servicoDto){
        return ResponseEntity.ok(service.editar(servicoDto));
    }

}
