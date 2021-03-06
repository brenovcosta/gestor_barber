package com.gestor_barber.backend.service;

import com.gestor_barber.backend.model.Agenda;
import com.gestor_barber.backend.repository.AgendaRepository;
import com.gestor_barber.backend.service.dto.AgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaDTO;
import com.gestor_barber.backend.service.dto.FiltroAgendaReservadosDTO;
import com.gestor_barber.backend.service.dto.PdfOptionsDTO;
import com.gestor_barber.backend.service.mapper.AgendaMapper;
import com.gestor_barber.backend.service.util.BuilderEntity;
import com.gestor_barber.backend.service.util.ConstantesUtil;
import com.itextpdf.text.DocumentException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AgendaService {

    private final AgendaRepository agendaRepository;
    private final AgendaMapper agendaMapper;
    private final PdfService pdfService;

    public AgendaDTO criar(AgendaDTO agendaDTO){
        Agenda agenda = agendaMapper.toAgenda(agendaDTO);
        return agendaMapper.toAgendaDTO(agendaRepository.save(agenda));
    }

    public List<AgendaDTO> buscarTodos(){
        return agendaRepository.findAll().stream().map(agendaMapper::toAgendaDTO).collect(Collectors.toList());
    }

    public AgendaDTO buscarPeloId(Long id) {
        Optional<Agenda> agenda = this.agendaRepository.findById(id);
        return agenda.map(agendaMapper::toAgendaDTO).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public AgendaDTO editar(AgendaDTO agendaDTO){
        Optional<Agenda> agenda = this.agendaRepository.findById(agendaDTO.getId());
        return agenda.map(value -> agendaMapper.toAgendaDTO(agendaRepository.save(agendaMapper.toAgenda(agendaDTO))))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void excluir(Long id){
        Agenda agenda = agendaRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        agendaRepository.delete(agenda);
    }

    public Page<List<FiltroAgendaDTO>> buscaDisponiveis(AgendaDTO agendaDTO, Pageable pageable){
        return agendaRepository.buscarHorariosDisponiveis(agendaDTO, pageable);
    }

    public Page<List<FiltroAgendaReservadosDTO>> buscaReservados(AgendaDTO agendaDTO, Pageable pageable){
        return agendaRepository.buscarHorariosReservados(agendaDTO, pageable);
    }

    public AgendaDTO agendar(AgendaDTO agendaDTO){
        Optional<Agenda> agenda = this.agendaRepository.findById(agendaDTO.getId());
        return agenda.map(value -> agendaMapper.toAgendaDTO(agendaRepository.save(agendaMapper.toAgenda(agendaDTO))))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public byte[] gerarArquivoPdf(List<AgendaDTO> agendaDTOList) throws IOException, DocumentException {
        String template = "relatorio-agenda";

        final float[] totalPeriodo = {0F};
        agendaDTOList.forEach(agendaDTO -> totalPeriodo[0] = dateToStringFormatado(totalPeriodo[0], agendaDTO.getServico().getPreco()));
        BigDecimal total = BigDecimal.valueOf(totalPeriodo[0]);

        Map<String, Object> params = BuilderEntity
                .pdf()
                .addParamIfNotNull(ConstantesUtil.AGENDA, agendaDTOList)
                .addParamIfNotNull(ConstantesUtil.TOTAL_PERIODO, total)
                .build();
        return pdfService.generatePdf(template, params, new PdfOptionsDTO(ConstantesUtil.MARGIN_PDF));
    }

    public float dateToStringFormatado(float total, float preco){
        return total += preco;
    }

}