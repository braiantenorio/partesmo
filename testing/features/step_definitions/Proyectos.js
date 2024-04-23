const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const request = require('sync-request');

Given('la empresa con nombre {string} y cuit {string}', function (_nombre, cuit) {
    let res = request('GET', 'http://backend:8080/empresas/' + cuit);

    this.empresa = JSON.parse(res.body, 'utf8').data;

    return assert.equal(res.statusCode, 200);
});

Given('que se ingresa el proyecto con código {string} y descripción {string}', function (codigo, descripcion) {
    let proyectoSinTareas = {
        "codigo": codigo,
        "descripcion": descripcion,
        "empresa": this.empresa
    };

    let res = request('POST', 'http://backend:8080/proyectos', { json: proyectoSinTareas });

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

Given('el proyecto con código {string} que pertenece al cliente cuit {string}', function (codigoProyecto, _cuit) {
    let res = request('GET', 'http://backend:8080/proyectos/' + codigoProyecto);

    this.proyecto = JSON.parse(res.body, 'utf8').data;
    return assert.equal(res.statusCode, 200);
});

Given('que se ingresa la tarea con codigo {string} y descripción {string}', function (codigo, descripcion) {
    let tarea = {
        "codigo": codigo,
        "descripcion": descripcion
    }

    this.proyecto.tareas.push(tarea);

    let res = request('POST', 'http://backend:8080/proyectos', { json: this.proyecto });

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

When('se solicitan guardar una nueva tarea en el proyecto', function () {
    return 'success';
});

When('se solicitan guardar el nuevo proyecto', function () {
    return 'success';
});

Then('se obtiene la siguiente {string}', function (respuestaEsperada) {
    assert.equal(this.response.message, respuestaEsperada);
});
