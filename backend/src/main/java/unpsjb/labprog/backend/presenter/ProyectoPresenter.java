package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Proyecto;
import unpsjb.labprog.backend.business.ProyectoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("proyectos")
public class ProyectoPresenter {

  @Autowired
  ProyectoService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Proyecto proyectoOrNull = service.findById(id);
    return (proyectoOrNull != null) ? Response.ok(proyectoOrNull) : Response.notFound();
  }

  @RequestMapping(value="/{codigo}", method=RequestMethod.GET)
  public ResponseEntity<Object> findByCuit(@PathVariable("codigo") String codigo) {    
    Proyecto proyectoOrNull = service.findByCodigo(codigo);
    return (proyectoOrNull != null)?
      Response.ok(proyectoOrNull, "Operario con codigo: " + codigo +  " recuperado correctamente"):
      Response.notFound("Operario no existe");
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> save(@RequestBody Proyecto proyecto) {
    return Response.ok(service.save(proyecto), "Proyecto actualizado correctamente");
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> add(@RequestBody Proyecto proyecto) {
    return Response.ok(service.add(proyecto),
        "Proyecto " + proyecto.getCodigo() + " para " + proyecto.getEmpresa().getNombre() + " ingresado correctamente");
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteAll() {
    service.deleteAll();
    return Response.ok("Todos los proyectos eliminados correctamente");
  }

  @RequestMapping(value="/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteById(@PathVariable("id") int id) {
    service.deleteById(id);
    return Response.ok("Proyecto con id: " + id + " eliminado correctamente");
  }

  @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
  public ResponseEntity<Object> search(@PathVariable("term") String term) {
    return Response.ok(service.search(term));
  }
}
