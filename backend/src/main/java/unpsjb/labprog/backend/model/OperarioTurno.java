package unpsjb.labprog.backend.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class OperarioTurno {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
 
    @ManyToOne
    @JoinColumn(name = "operario_id")
    private Operario operario;
    
    @ManyToOne
    @JoinColumn(name = "turno_id")
    private Turno turno;
    
    private LocalDate fechaDesde;

    private LocalDate fechaHasta;
}
