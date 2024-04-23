package unpsjb.labprog.backend.business;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.Tarea;

@Repository
public interface TareaRepository extends CrudRepository<Tarea, Integer> {

    @Query("SELECT e FROM Tarea e WHERE e.codigo = ?1")
    Optional<Tarea> findByCode(String cuit);
}
