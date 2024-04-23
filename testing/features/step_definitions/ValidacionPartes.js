const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const request = require('sync-request');
const jd = require('json-diff');
const deleteKey = require('key-del');

Given('el siguiente listado de partes de mano de obra en estado a validar', function (docString) {

    this.partes = JSON.parse(docString);

    return 'success';
});

When('se solicita validar los partes a la fecha {string}', function (_string) {
    let fecha = "2023-05-12";
    let res = request('POST', 'http://backend:8080/partes/informes/validaciones?fecha=' + fecha);

    this.response = JSON.parse(res.body, 'utf8').data;
    assert.equal(res.statusCode, 200);
});

Then('se obtiene la siguiente respuesta', function (docString) {
    this.respuestaEsperada = JSON.parse(docString);
    deleteKey(this.respuestaEsperada, ['id', 'sector'], { copy: false });

    this.response.sort((a,b) => a.id - b.id);

    deleteKey(this.response, ['id', 'proyecto.empresa', 'proyecto.tareas', 'operario.categoria', 'deleted', 'supervisor'], { copy: false });

    let diff = jd.diff(
        this.respuestaEsperada,
        this.response);

    return assert.equal(diff, null);
});