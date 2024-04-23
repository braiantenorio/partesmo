package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unpsjb.labprog.backend.model.Proyecto;

@Service
public class ProyectoService {

    @Autowired
    ProyectoRepository repository;

    public List<Proyecto> findAll() {
        List<Proyecto> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Proyecto findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Proyecto findByCodigo(String codigo) {
        return repository.findByCodigo(codigo).orElse(null);
    }

    @Transactional
    public Proyecto save(Proyecto proyecto) {
        return repository.save(proyecto);
    }

    @Transactional
    public Proyecto add(Proyecto proyecto) {
        return repository.save(proyecto);
    }

    @Transactional
    public void deleteAll() {
        repository.deleteAll();
    }

    @Transactional
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    public List<Proyecto> search(String term) {
        return repository.search(term);
    }
}
