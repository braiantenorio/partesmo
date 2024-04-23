package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unpsjb.labprog.backend.DTO.LogId;
import unpsjb.labprog.backend.model.LogValidacionParteMO;

@Service
public class LogValidacionParteMOService {

    @Autowired
    LogValidacionParteMORepository repository;

    public List<LogValidacionParteMO> findAll() {
        List<LogValidacionParteMO> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public List<LogId> hardFindAll() {
        return repository.hardFindAll();
    }

    public LogValidacionParteMO findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public LogValidacionParteMO save(LogValidacionParteMO logValidacionParteMO) {
        return repository.save(logValidacionParteMO);
    }

    @Transactional
    public LogValidacionParteMO add(LogValidacionParteMO logValidacionParteMO) {
        return repository.save(logValidacionParteMO);
    }

    @Transactional
    public void deleteAll(List<LogValidacionParteMO> logList) {
        repository.deleteAll(logList);
    }

    @Transactional
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Transactional
    public void hardDeleteById(int id) {
        repository.hardDeleteById(id);
        ;
    }
}
