package unpsjb.labprog.backend.business;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unpsjb.labprog.backend.model.OperarioTurno;
import unpsjb.labprog.backend.model.Turno;

@Service
public class OperarioTurnoService {

    @Autowired
    OperarioTurnoRepository repository;

    public List<OperarioTurno> findAll() {
        List<OperarioTurno> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public OperarioTurno findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public OperarioTurno save(OperarioTurno empresa) {
        return repository.save(empresa);
    }

    @Transactional
    public OperarioTurno add(OperarioTurno empresa) {
        return repository.save(empresa);
    }

    @Transactional
    public void deleteAll() {
        repository.deleteAll();
    }

    @Transactional
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    public Turno getHorarios(int legajo, LocalDate fecha) {
        return repository.getHorarios(legajo, fecha);

    }

    public OperarioTurno turnoPorOperario(int legajo){
        return repository.turnoPorOperario(legajo);
    }
}
