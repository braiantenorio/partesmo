const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const request = require('sync-request');

Given('que se ingresa el operario con legajo {string}, con nombre {string} cuya categoría es {string} y pertenece al turno {string} a partir de {string}', function (legajo, nombre, categoria, turno, fechaDesde) {
    let operario = {
        "legajo": legajo,
        "nombre": nombre,
        "categoria": categoria
    }

    this.operarioTurnoWrapper = {
        "operario": operario,
        "turno": {
            "nombre": turno
        },
        "fechaDesde": fechaDesde,
    };

    let res = request('POST', 'http://backend:8080/operarios', { json: this.operarioTurnoWrapper });

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

Then('se espera la siguiente respuesta {string}', function (respuestaEsperada) {
    assert.equal(this.response.message, respuestaEsperada);
});