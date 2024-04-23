package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Empresa;
import unpsjb.labprog.backend.business.EmpresaService;
import unpsjb.labprog.backend.business.OperarioTurnoRepository;

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
@RequestMapping("empresas")
public class EmpresaPresenter {

  @Autowired
  EmpresaService service;

  //TODO:borrar
  @Autowired
  OperarioTurnoRepository operarioTurnoRepository;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Empresa empresaOrNull = service.findById(id);
    return (empresaOrNull != null) ? Response.ok(empresaOrNull) : Response.notFound();
  }

  @RequestMapping(value="/{cuit}", method=RequestMethod.GET)
  public ResponseEntity<Object> findByCuit(@PathVariable("cuit") String cuit) {    
    Empresa empresaOrNull = service.findByCuit(cuit);
    return (empresaOrNull != null)?
      Response.ok(empresaOrNull, "Cliente recuperado correctamente"):
      Response.notFound("Cliente no existe");
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> save(@RequestBody Empresa empresa) {
    return Response.ok(service.save(empresa), "Cliente actualizado correctamente");
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> add(@RequestBody Empresa empresa) {
    return Response.ok(service.add(empresa),
        "Cliente " + empresa.getNombre() + " con cuit " + empresa.getCuit() + " cargado correctamente");
  }

  @RequestMapping(method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteAll() {
    service.deleteAll();
    return Response.ok("Todos los clientes eliminados correctamente");
  }

  @RequestMapping(value="/id/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteById(@PathVariable("id") int id) {
    service.deleteById(id);
    return Response.ok("Cliente con id: " + id + " eliminado correctamente");
  }
//TODO:borrar
  @RequestMapping( value="/id", method = RequestMethod.GET)
  public ResponseEntity<Object> nose(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha, @RequestParam("legajo") int legajo) {
    return Response.ok(operarioTurnoRepository.getHorarios(legajo, fecha),"AAAAAAA");
  }
  
  @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
  public ResponseEntity<Object> search(@PathVariable("term") String term) {
    return Response.ok(service.search(term));
  }
}
