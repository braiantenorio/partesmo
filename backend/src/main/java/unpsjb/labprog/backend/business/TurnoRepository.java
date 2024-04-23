package unpsjb.labprog.backend.business;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.Turno;

@Repository
public interface TurnoRepository extends CrudRepository<Turno, Integer> {

    @Query("SELECT t FROM Turno t WHERE t.nombre = ?1")
    Optional<Turno> findByName(String codigo);

}
