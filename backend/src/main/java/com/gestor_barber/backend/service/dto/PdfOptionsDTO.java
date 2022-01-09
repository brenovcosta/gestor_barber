package com.gestor_barber.backend.service.dto;

import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PdfOptionsDTO {

    private Boolean landscape = false;
    private Float marginTop = 0f;
    private Float marginBottom = 0f;
    private Float marginLeft = 0f;
    private Float marginRight = 0f;
    private List<ImagePositionDTO> imagens = new ArrayList<>();

    public PdfOptionsDTO(Float margin) {
        this.marginTop = margin;
        this.marginBottom = margin;
        this.marginLeft = margin;
        this.marginRight = margin;
    }

    public Rectangle getPageRotation(){
        return (this.landscape) ? PageSize.A4.rotate() : PageSize.A4;
    }

}
