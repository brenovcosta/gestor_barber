package com.gestor_barber.backend.service.util;

public final class BuilderEntity {

    private BuilderEntity() {

    }

    public static PdfParamsBuilder pdf() {
        return new PdfParamsBuilder();
    }

}
