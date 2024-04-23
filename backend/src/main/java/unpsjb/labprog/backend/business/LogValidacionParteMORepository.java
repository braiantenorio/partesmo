package unpsjb.labprog.backend.business;

import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.DTO.LogId;
import unpsjb.labprog.backend.model.LogValidacionParteMO;

@Repository
public interface LogValidacionParteMORepository extends CrudRepository<LogValidacionParteMO, Integer> {

    @Modifying
    @Query(value = "DELETE FROM log_validacion_partemo WHERE id = :id", nativeQuery = true)
    void hardDeleteById(@Param("id") int id);

    @Query(value = "SELECT l.id as id FROM log_validacion_partemo l ", nativeQuery = true)
    List<LogId> hardFindAll();

}