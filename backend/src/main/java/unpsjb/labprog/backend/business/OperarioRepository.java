package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.Operario;

@Repository
public interface OperarioRepository
        extends CrudRepository<Operario, Integer>, PagingAndSortingRepository<Operario, Integer> {

    @Query("SELECT e FROM Operario e WHERE e.legajo = ?1")
    Optional<Operario> findByLegajo(String legajo);

    @Query("SELECT e FROM Operario e WHERE UPPER(e.nombre) LIKE UPPER(CONCAT('%', ?1, '%')) or CAST(e.legajo AS string) LIKE CONCAT('%', ?1, '%')")
    List<Operario> search(String term);
}
