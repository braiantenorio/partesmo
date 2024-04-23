package unpsjb.labprog.backend.business;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unpsjb.labprog.backend.DTO.InformePartes;
import unpsjb.labprog.backend.DTO.StatObject;
import unpsjb.labprog.backend.DTO.SupervisorStats;
import unpsjb.labprog.backend.model.LogValidacionParteMO;
import unpsjb.labprog.backend.model.Parte;
import unpsjb.labprog.backend.model.Turno;
import unpsjb.labprog.backend.model.Constante;

@Service
public class ParteService {

    @Autowired
    EstadoRepository estadoRepository;

    @Autowired
    OperarioTurnoService operarioTurnoService;

    @Autowired
    ValidacionParteMORepository validacionParteMORepository;

    @Autowired
    LogValidacionParteMOService logValidacionParteMOService;

    @Autowired
    ParteRepository repository;

    public List<Parte> findAll() {
        List<Parte> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Parte findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public List<Parte> findAllById(List<Integer> ids) {
        List<Parte> result = new ArrayList<>();
        repository.findAllById(ids).forEach(e -> result.add(e));
        return result;
    }
 
    @Transactional
    public Parte update(Parte parte) {
        validacionColateral(parte);
        parte.setEstado(estadoRepository.findByName(Constante.ESTADO_CORREGIDO).orElse(null));
        if (parte.getLogValidacionParteMO() != null) {
            for (LogValidacionParteMO log : parte.getLogValidacionParteMO()) {
                log.setDeleted(true); 
            }
        }
        Parte returnParte = repository.save(parte);
        returnParte.getLogValidacionParteMO().clear();
        return returnParte;
    }

    @Transactional
    public Parte add(Parte parte) {
        parte.setEstado(estadoRepository.findByName(Constante.ESTADO_GENERADO).orElse(null));
        return repository.save(parte);
    }

    @Transactional
    public void deleteAll() {
        repository.deleteAll();
    }

    @Transactional
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    public List<InformePartes> informesPartes(LocalDate fecha) {
        return repository.informesPartes(fecha);
    }

    public String getEstadoInforme(LocalDate fecha, int legajo) {
        return repository.getEstadoInforme(fecha, legajo);
    }

    @Transactional
    public Parte forzarValidacion(Parte parte) {
        for (Parte p : repository.partesPorFechaOperario(parte.getFecha(), parte.getOperario().getLegajo())) {
            p.setEstado(estadoRepository.findByName(Constante.ESTADO_VALIDADO).orElse(null));
            repository.save(p);
        }
        parte.setEstado(estadoRepository.findByName(Constante.ESTADO_VALIDADO).orElse(null));
        if (parte.getLogValidacionParteMO() != null) {
            for (LogValidacionParteMO log : parte.getLogValidacionParteMO()) {
                log.setDeleted(true);
            }
        }
        Parte returnParte = repository.save(parte);
        returnParte.getLogValidacionParteMO().clear();
        return returnParte;
    }

    public List<Parte> partesPorFechaOperario(LocalDate fecha, int legajo) {
        return repository.partesPorFechaOperario(fecha, legajo);
    }

    public List<InformePartes> informesPartesAValidar(LocalDate fecha) {
        return repository.informesPartesAValidar(fecha);
    }

    public List<Parte> validaciones(LocalDate fecha) {
        List<Parte> result = new ArrayList<Parte>();

        for (InformePartes informe : informesPartesAValidar(fecha)) {

            List<LogValidacionParteMO> listLogs = creacionLogs(informe, fecha);

            List<Integer> ids = new ArrayList<>();
            for (Parte parte : repository.partesPorFechaOperario(informe.getFecha(), informe.getLegajo())) {
                parte.setEstado(estadoRepository.findByName(listLogs.isEmpty() ? Constante.ESTADO_VALIDO : Constante.ESTADO_INVALIDO).orElse(null));
                logValidacionParteMOService.deleteAll(parte.getLogValidacionParteMO());
                parte.getLogValidacionParteMO().addAll(listLogs);
                repository.save(parte);
                ids.add(parte.getId());
            }
            result.addAll(findAllById(ids));
        }
        return result;
    }

    public List<InformePartes> informesInvalidos() {
        return repository.informesInvalidos().orElse(null);
    }

    public List<Parte> partesInvalidos() {
        return repository.partesInvalidos();
    }

    public List<StatObject> horasPorProyecto() {
        return repository.horasPorProyecto();
    }

    public List<StatObject> horasPorCliente() {
        return repository.horasPorCliente();
    }

    private List<LogValidacionParteMO> creacionLogs(InformePartes informe, LocalDate fecha) {
        List<LogValidacionParteMO> result = new ArrayList<LogValidacionParteMO>();

        LogValidacionParteMO log1 = new LogValidacionParteMO();
        log1.setEstado(estadoRepository.findByName(Constante.ESTADO_LOG_GENERADO).orElse(null));
        log1.setValidacionParteMO(validacionParteMORepository.findByName(Constante.ERROR_INCUMPLE_HORARIO).orElse(null));
        result.add(validacionIncumpleHorario(informe, fecha) ? log1 : null);

        LogValidacionParteMO log2 = new LogValidacionParteMO();
        log2.setEstado(estadoRepository.findByName(Constante.ESTADO_LOG_GENERADO).orElse(null));
        log2.setValidacionParteMO(validacionParteMORepository.findByName(Constante.ERROR_SUPERPOSICION_HORARIA).orElse(null));
        result.add(validacionSuperposicionHoraria(informe) ? log2 : null);

        LogValidacionParteMO log3 = new LogValidacionParteMO();
        log3.setEstado(estadoRepository.findByName(Constante.ESTADO_LOG_GENERADO).orElse(null));
        log3.setValidacionParteMO(validacionParteMORepository.findByName(Constante.ERROR_HUECO_HORARIO).orElse(null));
        result.add(validacionHuecoHorario(informe) ? log3 : null);

        LogValidacionParteMO log4 = new LogValidacionParteMO();
        log4.setEstado(estadoRepository.findByName(Constante.ESTADO_LOG_GENERADO).orElse(null));
        log4.setValidacionParteMO(validacionParteMORepository.findByName(Constante.ERROR_FUERA_DE_TURNO).orElse(null));
        result.add(validacionFueraDeTurno(informe, fecha) ? log4 : null);

        result.removeIf(Objects::isNull);

        return result;
    }

    private boolean validacionHuecoHorario(InformePartes informe) {
        return (informe.getHorasPartes().isBefore(informe.getHoras()));
    }

    private boolean validacionIncumpleHorario(InformePartes informe, LocalDate fecha) {
        Turno turno = operarioTurnoService.getHorarios(informe.getLegajo(), fecha);

        return ((informe.getIngreso().isAfter(turno.getHoraDesde())
                && informe.getIngreso().isBefore(turno.getHoraHasta()))
                || (informe.getEgreso().isAfter(turno.getHoraDesde())
                        && informe.getEgreso().isBefore(turno.getHoraHasta())));
    }

    private boolean validacionSuperposicionHoraria(InformePartes informe) {
        return (informe.getHorasPartes().isAfter(informe.getHoras()));
    }

    private boolean validacionFueraDeTurno(InformePartes informe, LocalDate fecha) {
        Turno turno = operarioTurnoService.getHorarios(informe.getLegajo(), fecha);
        return ((informe.getIngreso().isAfter(turno.getHoraHasta())
                || (informe.getIngreso().equals(turno.getHoraHasta())))
                || (informe.getEgreso().isBefore(turno.getHoraDesde())
                        || (informe.getEgreso().equals(turno.getHoraDesde()))));
    }

    private void validacionColateral(Parte parte) {
        Parte parteOriginal = findById(parte.getId());

        if (parteOriginal.getOperario().getLegajo() != parte.getOperario().getLegajo()
                || !parteOriginal.getFecha().isEqual(parte.getFecha())) {
            for (Parte p : partesPorFechaOperario(parteOriginal.getFecha(), parteOriginal.getOperario().getLegajo())) {
                p.setEstado(estadoRepository.findByName(Constante.ESTADO_CORREGIDO).orElse(null));
                repository.save(p);
            }
        }
    }

    
    public List<SupervisorStats> controlErrores(){
        return repository.controlErrores();
    }

    public List<SupervisorStats> controlValidos(){
        return repository.controlValidos();
    }

}
