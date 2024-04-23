package unpsjb.labprog.backend.business;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.ValidacionParteMO;

@Repository
public interface ValidacionParteMORepository extends CrudRepository<ValidacionParteMO, Integer> {

    @Query("SELECT vpm FROM ValidacionParteMO vpm WHERE vpm.nombre = ?1")
    Optional<ValidacionParteMO> findByName(String nombre);
}
