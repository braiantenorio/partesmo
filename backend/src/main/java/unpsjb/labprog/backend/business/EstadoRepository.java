package unpsjb.labprog.backend.business;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Estado;

@Repository
public interface EstadoRepository extends CrudRepository<Estado, Integer> {

    @Query("SELECT e FROM Estado e WHERE e.nombre = ?1")
    Optional<Estado> findByName(String estado);
}
