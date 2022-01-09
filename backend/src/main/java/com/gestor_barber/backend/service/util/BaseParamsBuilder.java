package com.gestor_barber.backend.service.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public abstract class BaseParamsBuilder<T extends BaseParamsBuilder> {

    Map<String, Object> params = new HashMap<>();

    public T addParam(String key, Object value) {
        params.put(key, value);
        return (T) this;
    }

    public T addParamIfNotNull(String key, Object value) {
        Optional.ofNullable(value).ifPresent(v -> params.put(key, v));
        return (T) this;
    }

}
