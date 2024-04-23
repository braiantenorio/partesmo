package unpsjb.labprog.backend.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "legajo", "nombre", "ingreso", "egreso", "horas", "horasPartes" })
public interface InformePartes {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    LocalDate getFecha();

    int getLegajo();

    String getNombre();

    @JsonFormat(pattern = "HH:mm")
    LocalTime getIngreso();

    @JsonFormat(pattern = "HH:mm")
    LocalTime getEgreso();

    @JsonFormat(pattern = "HH:mm")
    default LocalTime getHoras() {
        LocalTime horas = getEgreso().minusHours(getIngreso().getHour());
        return horas.minusMinutes(getIngreso().getMinute());
    }

    @JsonIgnore
    Long getHorasPartesC();

    @JsonFormat(pattern = "HH:mm")
    default LocalTime getHorasPartes() {
        long minutosTotales = getHorasPartesC();
        int horas = (int) minutosTotales / 60;
        int minutes = (int) minutosTotales % 60;
        return LocalTime.of(horas, minutes);
    }
}
