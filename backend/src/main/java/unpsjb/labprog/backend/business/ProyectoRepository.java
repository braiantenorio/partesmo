package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Proyecto;

@Repository
public interface ProyectoRepository extends CrudRepository<Proyecto, Integer> {

    @Query("SELECT p FROM Proyecto p WHERE p.codigo = ?1")
    Optional<Proyecto> findByCodigo(String codigo);

    @Query("SELECT e FROM Proyecto e WHERE UPPER(e.descripcion) LIKE UPPER(CONCAT('%', ?1, '%')) or e.codigo LIKE CONCAT('%', ?1, '%')")
    List<Proyecto> search(String term);
}
