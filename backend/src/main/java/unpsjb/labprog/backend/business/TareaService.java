package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unpsjb.labprog.backend.model.Tarea;

@Service
public class TareaService {

    @Autowired
    TareaRepository repository;

    public List<Tarea> findAll() {
        List<Tarea> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Tarea findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Tarea findByCode(String cuit) {
        return repository.findByCode(cuit).orElse(null);
    }

    @Transactional
    public void deleteAll() {
        repository.deleteAll();
    }

    @Transactional
    public void deleteById(int id) {
        repository.deleteById(id);
    }
}
