package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.LogValidacionParteMO;
import unpsjb.labprog.backend.business.LogValidacionParteMOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("logs")
public class LogValidacionParteMOPresenter {

  @Autowired
  LogValidacionParteMOService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/hard",method = RequestMethod.GET)
  public ResponseEntity<Object> hardFindAll() {
    return Response.ok(service.hardFindAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    LogValidacionParteMO logValidacionParteMOOrNull = service.findById(id);
    return (logValidacionParteMOOrNull != null) ? Response.ok(logValidacionParteMOOrNull) : Response.notFound();
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> save(@RequestBody LogValidacionParteMO logValidacionParteMO) {
    return Response.ok(service.save(logValidacionParteMO), "log actualizado correctamente");
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> add(@RequestBody LogValidacionParteMO logValidacionParteMO) {
    return Response.ok(service.add(logValidacionParteMO),
        "log cargado correctamente");
  }

  @RequestMapping(value="/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteById(@PathVariable("id") int id) {
    service.deleteById(id);
    return Response.ok("logs con id: " + id + " eliminado correctamente");
  }

  @RequestMapping(value="/hard/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> hardDeleteById(@PathVariable("id") int id) {
    service.hardDeleteById(id);
    return Response.ok("logs con id: " + id + " eliminado fisicamente ");
  }

}
