package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.DTO.InformePartes;
import unpsjb.labprog.backend.model.Parte;
import unpsjb.labprog.backend.business.ParteService;
import java.time.LocalDate;
import java.util.List;
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
@RequestMapping("partes")
public class PartePresenter {

  @Autowired
  ParteService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Parte parteOrNull = service.findById(id);
    return (parteOrNull != null) ? Response.ok(parteOrNull) : Response.notFound();
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> save(@RequestBody Parte parte) {
    return Response.ok(service.update(parte), "Parte MO alterado correctamente");
  }

  @RequestMapping(value = "/forzarvalidacion",method = RequestMethod.PUT)
  public ResponseEntity<Object> forzarValidacion(@RequestBody Parte parte) {
    return Response.ok(service.forzarValidacion(parte), "Parte MO alterado correctamente");
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> add(@RequestBody Parte parte) {
    return Response.ok(service.add(parte),
        "Parte MO generado correctamente");
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteAll() {
    service.deleteAll();
    return Response.ok("Todos los partes eliminados correctamente");
  }

  @RequestMapping(value="/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteById(@PathVariable("id") int id) {
    service.deleteById(id);
    return Response.ok("Parte con id: " + id + " eliminado correctamente");
  }

  @RequestMapping(value="/informes", method = RequestMethod.GET)
  public ResponseEntity<Object> informesPartes(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
    return Response.ok(service.informesPartes(fecha));
  }

  @RequestMapping(value="/informes/estado", method = RequestMethod.GET)
  public ResponseEntity<Object> getEstadoInforme(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha, @RequestParam("legajo") int legajo) {
    return Response.ok(service.getEstadoInforme(fecha, legajo),"estado de informe recuperado correctamente");
  }

  @RequestMapping(value="/informes/validaciones", method = RequestMethod.POST)
  public ResponseEntity<Object> validaciones(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
    return Response.ok( service.validaciones(fecha) ,"validacion ejecutada correctamente");
  }

  @RequestMapping(value="/informes/validaciones", method = RequestMethod.GET)
  public ResponseEntity<Object> partesPorFechaOperario(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha, @RequestParam("legajo") int legajo) {
    return Response.ok(service.partesPorFechaOperario(fecha, legajo),"partes por fecha y legajo recuperadas correctamente");
  }

  @RequestMapping(value="/informes/invalidos", method = RequestMethod.GET)
  public ResponseEntity<Object> informesInvalidos() {
    List<InformePartes> informesOrNull = service.informesInvalidos();
    return (informesOrNull != null) ? Response.ok(informesOrNull) : Response.notFound();
    }

  @RequestMapping(value="/informes/avalidar", method = RequestMethod.GET)
  public ResponseEntity<Object> horario(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
    return Response.ok(service.informesPartesAValidar(fecha),"informes a validar recuperados correctamente");
  }

  @RequestMapping(value="/invalidos", method = RequestMethod.GET)
  public ResponseEntity<Object> partesInvalidos() {
    return Response.ok(service.partesInvalidos(),"Partes invalidos recuperados correctamente");
  }

  @RequestMapping(value="/proyectos/estadisticas", method = RequestMethod.GET)
  public ResponseEntity<Object> horasPorProyecto() {
    return Response.ok(service.horasPorProyecto(),"estadisticas de horas por proyecto recuperadas correctamente");
  }

  @RequestMapping(value="/clientes/estadisticas", method = RequestMethod.GET)
  public ResponseEntity<Object> horasPorCliente() {
    return Response.ok(service.horasPorCliente(),"estadisticas de horas por operario recuperadas correctamente");
  }

  @RequestMapping(value="/errores/estadisticas", method = RequestMethod.GET)
  public ResponseEntity<Object> controlErrores() {
    return Response.ok(service.controlErrores(),"estadisticas de horas por operario recuperadas correctamente");
  }

    @RequestMapping(value="/validos/estadisticas", method = RequestMethod.GET)
  public ResponseEntity<Object> controlValidos() {
    return Response.ok(service.controlValidos(),"estadisticas de validos por supervisor recuperadas correctamente");
  }
  
}

