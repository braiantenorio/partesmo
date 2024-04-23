package unpsjb.labprog.backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface StatObject {

    String getCodigo();

    @JsonIgnore
    Long getHorasPartesC();

    default double getHoras() {
        double result = (double) getHorasPartesC() / 60;
        return result;
    }

    String getQuincena();
}
