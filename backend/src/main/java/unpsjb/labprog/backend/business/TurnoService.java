package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unpsjb.labprog.backend.model.Turno;

@Service
public class TurnoService {

    @Autowired
    TurnoRepository repository;

    public List<Turno> findAll() {
        List<Turno> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Turno findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Turno save(Turno turno) {
        return repository.save(turno);
    }

    @Transactional
    public Turno add(Turno turno) {
        return repository.save(turno);
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
