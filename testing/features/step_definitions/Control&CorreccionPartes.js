const assert = require('assert');
const { Given, When, Then, Before } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');
const deleteKey = require('key-del');
var givenCount = 0;
var whenCount = 0;
var anotherCount = 0

let res;

Before("@importante", function () {

    if (anotherCount == 0) {
        res = request('GET', 'http://backend:8080/partes/invalidos');
    }
    anotherCount++;
});

Given('el parte "{string}" que está inválido', function (string) {

    this.parteInvalido = JSON.parse(string);
    deleteKey(this.parteInvalido, ['id', 'sector'], { copy: false });

    this.response = JSON.parse(res.body, 'utf8');
    this.response.data.sort((a, b) => a.id - b.id);
    let result = deleteKey(this.response.data, ['id', 'proyecto.empresa', 'proyecto.tareas', 'operario.categoria', 'deleted', 'supervisor']);

    let diff = jd.diff(
        this.parteInvalido,
        result[givenCount++]);

    return assert.equal(diff, null);
});

When('se corrige el "{string}"', function (string) {

    this.parteCorregido = JSON.parse(string);
    
    this.response.data[whenCount].horaDesde = this.parteCorregido.horaDesde;
    this.response.data[whenCount].horaHasta = this.parteCorregido.horaHasta;


    let res2;
    if (this.response.data[whenCount].operario.legajo == 3000) {
        res2 = request('PUT', 'http://backend:8080/partes/forzarvalidacion', { json: this.response.data[whenCount] })

    } else {
        res2 = request('PUT', 'http://backend:8080/partes', { json: this.response.data[whenCount] })
    }
    whenCount++;

    this.response = JSON.parse(res2.body, 'utf8');
    
    return assert.equal(this.response.status, 200);
});

Then('se espera el siguiente resultado "{string}"', function (string) {
    this.respuestaEsperada = JSON.parse(string);

    deleteKey(this.respuestaEsperada, ['id', 'sector'], { copy: false });

    deleteKey(this.response, ['id', 'proyecto.empresa', 'proyecto.tareas', 'operario.categoria', 'supervisor'], { copy: false });

    let diff = jd.diff(
        this.respuestaEsperada.data,
        this.response.data);

    assert.equal(this.response.status, this.respuestaEsperada.StatusCode);
    assert.equal(this.response.message, this.respuestaEsperada.StatusText);
    assert.equal(diff, null);
});