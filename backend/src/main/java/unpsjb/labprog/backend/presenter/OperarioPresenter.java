package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.DTO.OperarioDTO;
import unpsjb.labprog.backend.business.OperarioService;
import unpsjb.labprog.backend.business.OperarioTurnoRepository;
import unpsjb.labprog.backend.business.TurnoRepository;
import unpsjb.labprog.backend.model.Operario;
import unpsjb.labprog.backend.model.OperarioTurno;
import unpsjb.labprog.backend.model.Turno;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("operarios")
public class OperarioPresenter {

  @Autowired
  OperarioService service;

  @Autowired
  TurnoRepository turnoRepository;

  @Autowired
  OperarioTurnoRepository operarioTurnoRepository;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Operario operarioOrNull = service.findById(id);
    return (operarioOrNull != null) ? Response.ok(operarioOrNull) : Response.notFound();
  }

  @RequestMapping(value = "/{legajo}", method = RequestMethod.GET)
  public ResponseEntity<Object> findByCuit(@PathVariable("legajo") String legajo) {
    Operario operarioOrNull = service.findByLegajo(legajo);
    return (operarioOrNull != null) ? Response.ok(operarioOrNull, "Operario recuperado correctamente")
        : Response.notFound("Operario no existe");
  }

  @RequestMapping(value="/page", method=RequestMethod.GET)
  public ResponseEntity<Object> findByPage(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {      
      return Response.ok(service.findByPage(page, size));
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> save(@RequestBody Operario operario) {
    return Response.ok(service.save(operario), "Operario actualizado correctamente");
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> add(@RequestBody OperarioDTO operarioWrapper) {
    Operario operarioGuardado = service.add(operarioWrapper.getOperario());
    if (operarioWrapper.getTurno() != null) {
      OperarioTurno operarioTurnoGuardado = new OperarioTurno();
      operarioTurnoGuardado.setOperario(operarioGuardado);
      Turno turnoAsignar = turnoRepository.findByName(operarioWrapper.getTurno().getNombre()).orElse(null);
      operarioTurnoGuardado.setTurno(turnoAsignar);
      operarioTurnoGuardado.setFechaDesde(operarioWrapper.getFechaDesde());
      operarioTurnoGuardado.setFechaHasta(operarioWrapper.getFechaDesde().plusDays(100));

      operarioTurnoRepository.save(operarioTurnoGuardado);
    }
    return Response.ok(operarioGuardado, String.format(
        "Operario/a %d %s ingresado/a correctamente", operarioGuardado.getLegajo(), operarioGuardado.getNombre()));
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteAll() {
    service.deleteAll();
    return Response.ok("Todos los operarios eliminados correctamente");
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteById(@PathVariable("id") int id) {
    service.deleteById(id);
    return Response.ok("Operario con id: " + id + " eliminado correctamente");
  }

  @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
  public ResponseEntity<Object> search(@PathVariable("term") String term) {
    return Response.ok(service.search(term));
  }

  @RequestMapping(value = "/turnos", method = RequestMethod.GET)
  public ResponseEntity<Object> search(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha, @RequestParam("legajo") int legajo) {
    return Response.ok(service.getTurno(legajo, fecha));
  }

}
