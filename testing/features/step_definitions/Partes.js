const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const request = require('sync-request');

Given('el operario con legajo {string} y nombre {string} que trabaja en el turno {string} desde {string}', function (legajo, _nombre, _turno, _fechaTurnoDesde) {
    let res = request('GET', 'http://backend:8080/operarios/' + legajo);
    this.operario = JSON.parse(res.body, 'utf8').data;

    return assert.equal(res.statusCode, 200);
});

Given('que trabajó el día {string} para el proyecto {string} en la tarea {string} desde las {string} horas hasta las {string} horas, bajo la supervision de {string}', function (fechaParte, proyecto, codigo, horaDesde, horaHasta, supervisor) {
    let res = request('GET', 'http://backend:8080/proyectos/' + proyecto);
    this.proyecto = JSON.parse(res.body, 'utf8').data;

    res = request('GET', 'http://backend:8080/tareas/' + codigo);
    this.tarea = JSON.parse(res.body, 'utf8').data;

    this.parte = {
        "fecha": fechaParte,
        "horaDesde": horaDesde,
        "horaHasta": horaHasta,
        "operario": this.operario,
        "proyecto": this.proyecto,
        "tarea": this.tarea,
        "supervisor": supervisor
    }

    return assert.equal(res.statusCode, 200);
});

When('se solicitan generar el parte', function () {
    let res = request('POST', 'http://backend:8080/partes', { json: this.parte });

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

Then('se obtiene {string} con {string}', function (statusCode, statusText) {
    assert.equal(this.response.message, statusText);
    assert.equal(this.response.status, statusCode);
});