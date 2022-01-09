package com.gestor_barber.backend.resource;

import com.gestor_barber.backend.service.AgendaService;
import com.gestor_barber.backend.service.dto.AgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaReservadosDTO;
import com.itextpdf.text.DocumentException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/agenda")
public class AgendaResource {

    private final AgendaService agendaService;

    @GetMapping
    public ResponseEntity<List<AgendaDTO>> bucarTodos() {
        return new ResponseEntity<>(agendaService.buscarTodos(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AgendaDTO> criar(@RequestBody AgendaDTO agendaDTO){
        return new ResponseEntity<>(agendaService.criar(agendaDTO), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendaDTO> buscarPeloId(@PathVariable Long id) {
        return ResponseEntity.ok(agendaService.buscarPeloId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        agendaService.excluir(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<AgendaDTO> editar(@RequestBody AgendaDTO agendaDTO){
        return ResponseEntity.ok(agendaService.editar(agendaDTO));
    }

    @PostMapping("/reservado")
    public ResponseEntity<Page<List<FiltroAgendaReservadosDTO>>> buscaReservados(@RequestBody AgendaDTO agendaDTO, Pageable pageable) {
        return ResponseEntity.ok(agendaService.buscaReservados(agendaDTO, pageable));
    }

    @PostMapping("/filtrar")
    public ResponseEntity<List<FiltroAgendaReservadosDTO>> buscarHorariosPorData(@RequestBody AgendaDTO agendaDTO) {
       return new ResponseEntity<>(agendaService.buscarHorariosPorData(agendaDTO), HttpStatus.OK);
    }

    @PostMapping("/disponivel")
    public ResponseEntity<Page<List<FiltroAgendaDTO>>> buscaDisponiveis(@RequestBody AgendaDTO agendaDTO, Pageable pageable) {
        return ResponseEntity.ok(agendaService.buscaDisponiveis(agendaDTO, pageable));
    }

    @PutMapping("/agendar")
    public ResponseEntity<AgendaDTO> reservarHorario(@RequestBody AgendaDTO agendaDTO){
        return ResponseEntity.ok(agendaService.agendar(agendaDTO));
    }

    @PostMapping("/exportar-pdf")
    public ResponseEntity<byte[]> exportarPDF(@RequestBody List<AgendaDTO> dirfDTOList) throws IOException, DocumentException {
        return ResponseEntity.ok(agendaService.gerarArquivoPdf(dirfDTOList));
    }

}