/// <reference lib="webworker" />
import * as XLSX from "xlsx";

addEventListener('message', ({ data }) => {
  const binarystr: string = data.binarystr;
  const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  console.info(0)
  const wsname: string = wb.SheetNames[0];
  //console.info(wsname)
  const ws = wb.Sheets[wsname];
  const json = XLSX.utils.sheet_to_json(ws);
  postMessage(json);
});
