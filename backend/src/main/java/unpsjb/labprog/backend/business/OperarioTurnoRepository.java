package unpsjb.labprog.backend.business;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.OperarioTurno;
import unpsjb.labprog.backend.model.Turno;

@Repository
public interface OperarioTurnoRepository extends CrudRepository<OperarioTurno, Integer> {

    @Query("SELECT op.turno " +
    "FROM OperarioTurno op " +
    "WHERE op.operario.legajo = ?1 AND ?2 BETWEEN op.fechaDesde AND op.fechaHasta ")
    Turno getHorarios(int legajo, LocalDate fecha);


    @Query("select o from OperarioTurno o where o.operario.legajo= ?1")
    OperarioTurno turnoPorOperario(int legajo);
}
