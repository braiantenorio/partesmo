package unpsjb.labprog.backend.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
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
@SQLDelete(sql = "UPDATE log_validacion_partemo SET deleted = true WHERE id = ?")
@Where(clause = "deleted=false")
public class LogValidacionParteMO {

    //TODO: implementar filtros, nueva documentacion de hibernate 6.1, cambiar query de hardFindAll
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "estado_id", nullable = false)
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "validacionParteMO_id", nullable = false)
    private ValidacionParteMO validacionParteMO;

    private boolean deleted = Boolean.FALSE;

}
