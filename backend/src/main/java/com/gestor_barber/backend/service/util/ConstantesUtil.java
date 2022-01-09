package com.gestor_barber.backend.service.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ConstantesUtil {

    public static final String ERROR_TITLE = "error.title";

    public static final Float MARGIN_PDF = 25F;

    public static final String AGENDA = "agendaList";

    public static final String ERRO_EXPORTAR = "Erro ao exportar";
    public static final String ERRO_TITULO = "ERRO";

    public static final String HEADER_CACHE_CONTROL = "Cache-Control";
    public static final String HEADER_CACHE_CONTROL_VALUE = "no-cache, no-store, must-revalidate";
    public static final String HEADER_PRAGMA = "Pragma";
    public static final String HEADER_PRAGMA_VALUE = "no-cache";
    public static final String HEADER_EXPIRES = "Expires";
    public static final String HEADER_EXPIRES_VALUE = "0";
    public static final String HEADER_CONTENT_DISPOSITION = "Content-Disposition";
    public static final String HEADER_ATTACHMENT_FILENAME = "attachment; filename=";
}
