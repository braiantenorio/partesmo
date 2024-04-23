package unpsjb.labprog.backend.business;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unpsjb.labprog.backend.model.Operario;
import unpsjb.labprog.backend.model.Turno;

@Service
public class OperarioService {

    @Autowired
    OperarioRepository repository;

    @Autowired
    TurnoRepository turnoRepository;

    @Autowired
    OperarioTurnoRepository operarioTurnoRepository;

    public List<Operario> findAll() {
        List<Operario> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Operario findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Operario findByLegajo(String legajo) {
        return repository.findByLegajo(legajo).orElse(null);
    }

    @Transactional
    public Operario save(Operario operario) {
        return repository.save(operario);
    }

    @Transactional
    public Operario add(Operario operario) {
        return repository.save(operario);
    }

    @Transactional
    public void deleteAll() {
        repository.deleteAll();
    }

    @Transactional
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    public List<Operario> search(String term) {
        return repository.search(term);
    }

    public Turno getTurno(int legajo, LocalDate fecha) {
        return operarioTurnoRepository.getHorarios(legajo, fecha);
    }

    public Page<Operario> findByPage(int page, int size) {
        return repository.findAll(
                PageRequest.of(page, size));
    }
}
