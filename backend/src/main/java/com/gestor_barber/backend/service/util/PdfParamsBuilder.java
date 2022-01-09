package com.gestor_barber.backend.service.util;

import lombok.extern.log4j.Log4j2;

import java.util.Map;

@Log4j2
public class PdfParamsBuilder extends BaseParamsBuilder<PdfParamsBuilder>{

    public Map<String, Object> build() {
        return params;
    }

}
