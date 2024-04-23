package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Tarea;
import unpsjb.labprog.backend.business.TareaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tareas")
public class TareaPresenter {

  @Autowired
  TareaService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Tarea empresaOrNull = service.findById(id);
    return (empresaOrNull != null) ? Response.ok(empresaOrNull) : Response.notFound();
  }

  @RequestMapping(value="/{codigo}", method=RequestMethod.GET)
  public ResponseEntity<Object> findByCode(@PathVariable("codigo") String cuit) {    
    Tarea empresaOrNull = service.findByCode(cuit);
    return (empresaOrNull != null)?
      Response.ok(empresaOrNull, "Tarea recuperado correctamente"):
      Response.notFound("Tarea no existe");
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteAll() {
    service.deleteAll();
    return Response.ok("Todos las tareas eliminados correctamente");
  }

  @RequestMapping(value="/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteById(@PathVariable("id") int id) {
    service.deleteById(id);
    return Response.ok("Tarea con eliminada correctamente");
  }
}
