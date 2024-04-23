package unpsjb.labprog.backend.DTO;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import unpsjb.labprog.backend.model.Operario;
import unpsjb.labprog.backend.model.Turno;

@Getter
@Setter
@NoArgsConstructor
public class OperarioDTO {
 
    private Operario operario;
    
    private Turno turno;
    
    private LocalDate fechaDesde;

    private LocalDate fechaHasta;
}

