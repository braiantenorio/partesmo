package unpsjb.labprog.backend.business;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.DTO.InformePartes;
import unpsjb.labprog.backend.DTO.StatObject;
import unpsjb.labprog.backend.DTO.SupervisorStats;
import unpsjb.labprog.backend.model.Parte;

@Repository
public interface ParteRepository extends CrudRepository<Parte, Integer> {

    @Query("SELECT pmo.operario.legajo AS legajo, pmo.operario.nombre AS nombre, MIN(pmo.horaDesde) AS ingreso, MAX(pmo.horaHasta) AS egreso, " +
    "SUM((HOUR(pmo.horaHasta)*60 + MINUTE(pmo.horaHasta)) - (HOUR(pmo.horaDesde)*60 + MINUTE(pmo.horaDesde))) AS horasPartesC " + 
    "FROM Parte pmo WHERE pmo.fecha = ?1 " +
    "GROUP BY pmo.operario.legajo, pmo.operario.nombre ORDER BY 1 ASC")
    List<InformePartes> informesPartes(LocalDate fecha);

    @Query("SELECT pmo.fecha AS fecha, pmo.operario.legajo AS legajo, pmo.operario.nombre AS nombre, MIN(pmo.horaDesde) AS ingreso, MAX(pmo.horaHasta) AS egreso, " +
    "SUM((HOUR(pmo.horaHasta)*60 + MINUTE(pmo.horaHasta)) - (HOUR(pmo.horaDesde)*60 + MINUTE(pmo.horaDesde))) AS horasPartesC " +
    "FROM Parte pmo " + 
    "WHERE pmo.fecha <= ?1 " +
    "GROUP BY pmo.fecha, pmo.operario.legajo, pmo.operario.nombre " +
    "HAVING SUM(CASE WHEN pmo.estado.nombre = 'generado' OR pmo.estado.nombre = 'corregido' THEN 1 ELSE 0 END) >= 1 " +
    "ORDER BY pmo.fecha ASC")
    List<InformePartes> informesPartesAValidar(LocalDate fecha);

    @Query("SELECT pmo.fecha AS fecha, pmo.operario.legajo AS legajo, pmo.operario.nombre AS nombre, MIN(pmo.horaDesde) AS ingreso, MAX(pmo.horaHasta) AS egreso, " +
    "SUM((HOUR(pmo.horaHasta)*60 + MINUTE(pmo.horaHasta)) - (HOUR(pmo.horaDesde)*60 + MINUTE(pmo.horaDesde))) AS horasPartesC " +
    "FROM Parte pmo " +
    "GROUP BY pmo.fecha, pmo.operario.legajo, pmo.operario.nombre " +
    "HAVING COUNT(*) = SUM(CASE WHEN pmo.estado.nombre = 'inválido' THEN 1 ELSE 0 END)")
    Optional<List<InformePartes>> informesInvalidos();

    @Query("SELECT pmo FROM Parte pmo WHERE pmo.fecha = ?1 AND pmo.operario.legajo = ?2")
    List<Parte> partesPorFechaOperario(LocalDate fecha, int legajo);

    @Query("SELECT pmo FROM Parte pmo WHERE pmo.estado.nombre = 'inválido' ORDER BY pmo.id ASC ")
    List<Parte> partesInvalidos();

    @Query("SELECT pmo.proyecto.descripcion AS codigo, CONCAT((CASE WHEN DAY(pmo.fecha)<=15 THEN 1 ELSE 2 END), '-', MONTH(pmo.fecha), '-', YEAR(pmo.fecha)) AS quincena, " +
    "SUM((HOUR(pmo.horaHasta)*60 + MINUTE(pmo.horaHasta)) - (HOUR(pmo.horaDesde)*60 + MINUTE(pmo.horaDesde))) AS horasPartesC " +
    "FROM Parte pmo " +
    "WHERE pmo.estado.nombre = 'válido' " +
    "GROUP BY 1,2 " )
    List<StatObject> horasPorProyecto();

    @Query("SELECT pmo.proyecto.empresa.nombre AS codigo, CONCAT((CASE WHEN DAY(pmo.fecha)<=15 THEN 1 ELSE 2 END), '-', MONTH(pmo.fecha), '-', YEAR(pmo.fecha)) AS quincena, " +
    "SUM((HOUR(pmo.horaHasta)*60 + MINUTE(pmo.horaHasta)) - (HOUR(pmo.horaDesde)*60 + MINUTE(pmo.horaDesde))) AS horasPartesC " +
    "FROM Parte pmo " +
    "WHERE pmo.estado.nombre = 'válido' " +
    "GROUP BY 1,2 " )
    List<StatObject> horasPorCliente();

    @Query("SELECT CASE " +
    "WHEN EXISTS (SELECT pmo.estado FROM Parte pmo WHERE pmo.fecha = ?1 AND pmo.operario.legajo = ?2 AND (pmo.estado.nombre = 'generado' OR pmo.estado.nombre = 'corregido')) " +
    "THEN 'A Validar' " +
    "ELSE (SELECT pmo.estado.nombre FROM Parte pmo WHERE pmo.fecha = ?1 AND pmo.operario.legajo = ?2 ORDER BY pmo.estado.nombre ASC LIMIT 1) " +
    "END " +
    "FROM Parte p " +
    "ORDER BY 1 " +
    "LIMIT 1")
    String getEstadoInforme(LocalDate fecha, int legajo);

    @Query("SELECT err.supervisor AS key, SUM(CAST(err.errores AS Integer)) AS value " +
    "FROM (SELECT pmo.supervisor AS supervisor, pmo.fecha AS fecha, pmo.operario.legajo AS legajo, " +
    "COUNT(VALUE(pmo.logValidacionParteMO).validacionParteMO) / COUNT(DISTINCT pmo) AS errores " +
    "FROM Parte pmo " +
    "GROUP BY pmo.supervisor, pmo.fecha, pmo.operario.legajo) err " +
    "GROUP BY err.supervisor")
    List<SupervisorStats> controlErrores();

    @Query("SELECT supervisor AS key, COUNT(validos) AS value from (SELECT pmo.fecha AS fecha, pmo.operario.legajo AS legajo, pmo.supervisor AS supervisor, COUNT(distinct pmo) AS validos " +
    "FROM Parte pmo " +
    "GROUP BY 1, 2, 3 " +
    "HAVING COUNT(*) = SUM(CASE WHEN pmo.estado.nombre = 'válido' OR pmo.estado.nombre = 'validado' THEN 1 ELSE 0 END)) " +
    "GROUP BY 1" )
    List<SupervisorStats> controlValidos();

}
