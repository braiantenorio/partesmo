package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.PagingAndSortingRepository;
import unpsjb.labprog.backend.model.Empresa;

@Repository
public interface EmpresaRepository extends CrudRepository<Empresa, Integer>,
        PagingAndSortingRepository<Empresa, Integer> {

    @Query("SELECT e FROM Empresa e WHERE e.cuit = ?1")
    Optional<Empresa> findByCuit(String cuit);

    @Query("SELECT e FROM Empresa e WHERE UPPER(e.nombre) LIKE UPPER(CONCAT('%', ?1, '%')) or e.cuit LIKE CONCAT('%', ?1, '%')")
    List<Empresa> search(String term);

}
