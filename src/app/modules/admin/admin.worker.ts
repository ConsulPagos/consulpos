/// <reference lib="webworker" />

import * as XLSX from "xlsx";

addEventListener('message', ({ data }) => {

  const parseValue = function (type: string, value: string, d: number) {
    var data: any = value;
    switch (type) {
      case "string":
        data = value.toString();
        break;
      case "int":
        data = parseInt(value);
        break;
      case "double":
        if (d > 0) {
          data = (parseFloat(value.toString().trim().replace(".", '').replace(",", '.')) / Math.pow(10, d)).toFixed(d)
        } else {
          data = parseFloat(value.toString().trim().replace(".", '').replace(",", '.')).toFixed(2);
        }
        break;
      default:
        data = value;
        break;
    }


    return data;
  }

  const str: string = data.str;
  var nData: any;

  if (data.type == "EXCEL") {

    nData = []

    const wb: XLSX.WorkBook = XLSX.read(str, { type: 'binary' });
    console.info(0)
    const wsname: string = wb.SheetNames[data.n_pagina];
    const ws = wb.Sheets[wsname];
    const json = XLSX.utils.sheet_to_json(ws);

    json.forEach(linea => {
      var aux = {};
      for (let index = 0; index < data.plantilla.length; index++) {
        const col = data.plantilla[index];
        aux[col.columna] = parseValue(col.tipo, linea[col.nombre], col.decimales);
      }

      nData.push(aux)
    })

  } else if (data.type == "TXT") {

    nData = []

    var lines = str.split('\n');

    lines.forEach((l: string) => {
      const line = l.trim();
      var json = {};
      for (let index = 0; index < data.plantilla.length; index++) {

        const col = data.plantilla[index];

        if (line.length > 0) {
          const value = line.substring(col.inicia, col.inicia + col.longitud);
          json[`${col.nombre}`] = parseValue(col.tipo, value, col.decimales);
        }
      }

      if (line.length > 0) {
        if (nData == undefined) {
          nData = [json]
        } else {
          nData.push(json);
        }
      }

    });
  }

  postMessage(nData);

});

