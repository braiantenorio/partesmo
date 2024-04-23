const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const request = require('sync-request');

BeforeAll( function () {

        let res = request('GET', 'http://backend:8080/logs/hard');
        this.logs = JSON.parse(res.body, 'utf8').data;
        this.logs.forEach(log => request('DELETE', 'http://backend:8080/logs/hard/id/' + log.id));

        res = request('GET', 'http://backend:8080/partes');
        this.partes = JSON.parse(res.body, 'utf8').data;
        this.partes.forEach(parte => request('DELETE', 'http://backend:8080/partes/id/' + parte.id));

        res = request('GET', 'http://backend:8080/operarioTurnos');
        this.operarioTurnos = JSON.parse(res.body, 'utf8').data;
        this.operarioTurnos.forEach(operarioTurno => request('DELETE', 'http://backend:8080/operarioTurnos/id/' + operarioTurno.id));

        res = request('GET', 'http://backend:8080/operarios');
        this.operarios = JSON.parse(res.body, 'utf8').data;
        this.operarios.forEach(operario => request('DELETE', 'http://backend:8080/operarios/id/' + operario.id));

        res = request('GET', 'http://backend:8080/proyectos');
        this.proyectos = JSON.parse(res.body, 'utf8').data;
        this.proyectos.forEach(proyecto => request('DELETE', 'http://backend:8080/proyectos/id/' + proyecto.id));

        res = request('GET', 'http://backend:8080/empresas');
        this.empresas = JSON.parse(res.body, 'utf8').data;
        this.empresas.forEach(empresa => request('DELETE', 'http://backend:8080/empresas/id/' + empresa.id));

    });

AfterAll(function () {

    //para que realmente funcione, deberia volver a elminar todos los datos, pero tendria que recuperarlos aca por
    //que cambiaron los id

    //creo que los vuelve a postear por que empresas tiene clave unica el codigo, y entonces en cascada no puede insertar
    // por que no proyectos no tiene los id que conoce, entonces no inserta
    //this.empresas.forEach(empresa => request('POST', 'http://backend:8080/empresas', { json: empresa }));
    //this.proyectos.forEach(proyecto => request('POST', 'http://backend:8080/proyectos', { json: proyecto }));
    //this.operarios.forEach(operario => request('POST', 'http://backend:8080/operarios', { json: operario }));
    //this.operarioTurnos.forEach(operarioTurno => request('POST', 'http://backend:8080/operarioTurnos', { json: operarioTurno }));
    //this.partes.forEach(parte => request('POST', 'http://backend:8080/partes', { json: parte }));
   // this.logs.forEach(log => request('POST', 'http://backend:8080/logs', { json: log }));
});

Given('que se ingresa el cliente con {string}, {string} y {string}', function (string, string1, string2) {
    let empresa = {
        "nombre": string,
        "cuit": string1,
        "observaciones": string2
    };

    let res = request(
        'POST',
        'http://backend:8080/empresas',
        { json: empresa }
    );

    this.response = JSON.parse(res.body, 'utf8');

});

When('presiono el botón de guardar', function () {
    return 'success';
});

Then('se espera la siguiente {string}', function (respuestaEsperada) {
    assert.equal(this.response.message, respuestaEsperada);
});
