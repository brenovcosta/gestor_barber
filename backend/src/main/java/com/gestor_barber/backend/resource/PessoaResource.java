package com.gestor_barber.backend.resource;

import com.gestor_barber.backend.service.PessoaService;
import com.gestor_barber.backend.service.dto.PessoaDTO;
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
@RequestMapping("/api/pessoa")
public class PessoaResource {

    private PessoaService pessoaService;

    @GetMapping
    public ResponseEntity<List<PessoaDTO>> bucarTodos() {
        return new ResponseEntity<>(pessoaService.buscarTodos(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PessoaDTO> criar(@RequestBody PessoaDTO pessoaDTO){
        return new ResponseEntity<>(pessoaService.criar(pessoaDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaDTO> buscarPeloId(@PathVariable Long id) {
        return ResponseEntity.ok(pessoaService.buscarPeloId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        pessoaService.excluir(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<PessoaDTO> editar(@RequestBody PessoaDTO pessoaDTO){
        return ResponseEntity.ok(pessoaService.editar(pessoaDTO));
    }

}
