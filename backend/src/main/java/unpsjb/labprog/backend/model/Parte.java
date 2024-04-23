package unpsjb.labprog.backend.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Parte {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    private LocalDate fecha;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaDesde;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaHasta;

    @ManyToOne
    @JoinColumn(name = "operario_id", nullable = false)
    private Operario operario;

    @ManyToOne
    @JoinColumn(name = "proyecto_id", nullable = false)
    private Proyecto proyecto;

    @ManyToOne
    @JoinColumn(name = "tarea_id", nullable = true)
    private Tarea tarea;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "logValidacionParteMO_id")
    private List<LogValidacionParteMO> logValidacionParteMO;
 
    @Nullable 
    private String supervisor;

}