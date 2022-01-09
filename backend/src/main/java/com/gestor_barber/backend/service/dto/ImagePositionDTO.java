package com.gestor_barber.backend.service.dto;

import com.itextpdf.text.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ImagePositionDTO {

    private Image imagem;
    private Float posX;
    private Float posY;
}
