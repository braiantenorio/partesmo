package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.OperarioTurno;
import unpsjb.labprog.backend.business.OperarioTurnoService;

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
@RequestMapping("operarioTurnos")
public class OperarioTurnoPresenter {

  @Autowired
  OperarioTurnoService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    OperarioTurno operarioTurnoOrNull = service.findById(id);
    return (operarioTurnoOrNull != null) ? Response.ok(operarioTurnoOrNull) : Response.notFound();
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> save(@RequestBody OperarioTurno empresa) {
    return Response.ok(service.save(empresa), "OperarioTurno actualizado correctamente");
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> add(@RequestBody OperarioTurno operarioTurno) {
    return Response.ok(service.add(operarioTurno),
        "OperarioTurno cargado correctamente");
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteAll() {
    service.deleteAll();
    return Response.ok("Todos los operario turno eliminados correctamente");
  }

  @RequestMapping(value="/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteById(@PathVariable("id") int id) {
    service.deleteById(id);
    return Response.ok("OperarioTurno eliminado correctamente");
  }


  @RequestMapping(value="/porOperario", method = RequestMethod.GET)
  public ResponseEntity<Object> turnoPorOperario(@RequestParam("legajo") int legajo) {
    return Response.ok(service.turnoPorOperario(legajo),"partes por fecha y legajo recuperadas correctamente");
  }
}
