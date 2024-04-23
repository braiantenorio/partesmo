const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');


Given('los partes cargados', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'success';
});

When('se solicitan obtener el resumen de partes por día y operario', function () {
    // Write code here that turns the phrase above into concrete actions
    let fecha = "2023-05-12";
    let res = request('GET', 'http://backend:8080/partes/informes?fecha=' + fecha);
    this.resumen = JSON.parse(res.body, 'utf8').data;


    return assert.equal(res.statusCode, 200);
});

Then('se obtiene el siguiente resumen', function (docString) {
    // Write code here that turns the phrase above into concrete actions
    let resumenEsperado = JSON.parse(docString);


    resumenEsperado = resumenEsperado.sort((a, b) => a.legajo - b.legajo);
    this.resumen = this.resumen.sort((a, b) => a.legajo - b.legajo);

    //console.log(resumenEsperado);
    //console.log(this.resumen);

    let d = jd.diff(
        resumenEsperado,
        this.resumen);

    return assert.equal(d, null);
});