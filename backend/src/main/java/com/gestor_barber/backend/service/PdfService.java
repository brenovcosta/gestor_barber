package com.gestor_barber.backend.service;

import com.gestor_barber.backend.service.dto.ImagePositionDTO;
import com.gestor_barber.backend.service.dto.PdfOptionsDTO;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PdfService {

    private final TemplateEngine templateEngine;

    byte[] generatePdf(String template, Map<String, Object> params, PdfOptionsDTO options) throws DocumentException, IOException {
        String html = templateEngine.process(template, getContext(params));
        Document documentoPdf = new Document(options.getPageRotation(), options.getMarginLeft(), options.getMarginRight(), options.getMarginTop(), options.getMarginBottom());

        ByteArrayOutputStream documentoPdfStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(documentoPdf, documentoPdfStream);
        documentoPdf.open();

        InputStream documentoHtmlStream = new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8));
        XMLWorkerHelper.getInstance().parseXHtml(writer, documentoPdf, documentoHtmlStream, StandardCharsets.UTF_8);

        for (ImagePositionDTO positionDTO:
            options.getImagens()) {
            positionDTO.getImagem().setAbsolutePosition(positionDTO.getPosX(), positionDTO.getPosY());
            documentoPdf.add(positionDTO.getImagem());
        }

        documentoPdf.close();
        return documentoPdfStream.toByteArray();
    }

    private Context getContext(Map<String, Object> params) {
        Context ctx = new Context();
        params.forEach(ctx::setVariable);
        return ctx;
    }

}
