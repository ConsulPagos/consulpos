//import dateFormat from 'dateformat';
//import db from '../firebase';
import { jsPDF } from 'jspdf';
export default class pdfMaker {

    public VALUES = {
        HEAD_HEIGHT: 85,
        MARGIN_TOP: 40,
        MARGIN_LEFT: 25,
        MARGIN_RIGHT: 25,
        MARGIN_BOTTOM: 40,
        LINE_GAP: 25,
        PAY_DISTANCE: 12.4
    }

    private doc: jsPDF;
    private docPages = [0,];
    private saldoGlobal: number = 0;

    constructor() {

    }


    public static createPdf(historical: boolean = false) {


        var title = "";

        // pdfMaker.saldoGlobal = 0;
        // pdfMaker.VALUES.HEAD_HEIGHT = 85;
        // pdfMaker.VALUES.PAY_DISTANCE = 12.4;
        // this..docPages = [];

        console.log('se crea pdf')

        //let fecha_hoy = dateFormat(new Date(), 'dd/mm/yyyy');
        //let fecha_hoy_piso = dateFormat(new Date(), 'dd_mm_yyyy');
        const doc = new jsPDF();

        if (!historical) {
            title = 'Estado_Cuenta_Cliente_' + '.pdf';
        } else {
            title = 'Historico_Cobranzas_Cliente_' + '.pdf';
        }

        doc.setFontSize(12);



        /* START HEADER  */
        /* IMAGEN CONSULPAGOS */
        var img = new Image()
        img.src = '../../assets/images/consulpagos.png'
        doc.addImage(img, "png", 20, 20, 200, 100)

        doc.text('Estado de Cuenta', 20, 40)

        if (!historical) {
            /* TÍTULO ESTADO DE CUENTA*/
            //doc.addFont('Helvetica-Bold')

        } else {
            // /* TÍTULO HISTORICO*/
            // doc.font('Helvetica-Bold').text('Histórico Cobranzas', pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT / 2, {
            //     width: doc.page.width - pdfMaker.VALUES.MARGIN_RIGHT - 40,
            //     align: 'right',
            // }).font('Helvetica')
        }

        doc.save(title)

        //     /* SEPARADOR */
        //     doc
        //         .lineWidth(2)
        //         .lineCap('butt')
        //         .moveTo(pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT)
        //         .lineTo(doc.page.width - pdfMaker.VALUES.MARGIN_RIGHT, pdfMaker.VALUES.HEAD_HEIGHT)
        //         .stroke()

        //     /* LINEA 1 */
        //     doc.font('Helvetica-Bold')
        //         .text(`Rif:`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 1.5, {
        //             width: doc.page.width / 3 - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left',
        //         }).font('Helvetica')
        //     doc.text(lista.datos.rif, 0.75 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 1.5, {
        //         width: 2 * (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //         align: 'left',
        //     }).font('Helvetica')
        //     doc.font('Helvetica-Bold').text(`Fecha de Emisión:`, doc.page.width / 2 + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 1.5, {
        //         width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //         align: 'center'
        //     }).font('Helvetica')

        //     doc.text(fecha_hoy, 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 1.5, {
        //         width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //         align: 'right'
        //     })

        //     /* LINEA 2 */
        //     doc.font('Helvetica-Bold')
        //         .text(`Razón Social:`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 2.5, {
        //             width: doc.page.width / 3 - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left',
        //         }).font('Helvetica')
        //     doc.text(lista.datos.razon_social, 0.75 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 2.5, {
        //         width: 2 * (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //         align: 'left',
        //     }).font('Helvetica')

        //     /* LINEA 3 (DESPUES DEL HEADER)*/
        //     doc.font('Helvetica-Bold')
        //         .text(`Dirección:`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 3.5, {
        //             width: doc.page.width / 3 - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left',
        //         }).font('Helvetica')
        //     //console.log(lista.datos)
        //     const direccion = lista.datos.direccion ? lista.datos.direccion : lista.datos.direccion_fiscal;
        //     doc.text(direccion, 0.75 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 3.5, {
        //         width: 2.25 * (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //         align: 'left',
        //     }).font('Helvetica')


        //     /* END HEADER  */

        //     //console.log(i);
        //     /* SEPARADOR COLOR #B5C6E6*/
        //     doc
        //         .lineWidth(6)
        //         .lineCap('butt')
        //         .moveTo(pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 6.2)
        //         .lineTo(doc.page.width - pdfMaker.VALUES.MARGIN_RIGHT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 6.2)
        //         .stroke('#B5C6E6');

        //     /* LINEA 1 PORRATEO*/
        //     doc
        //         .font('Helvetica-Bold')
        //         .text(`Marca:`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 7, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left',
        //         })
        //         .font('Helvetica');

        //     doc
        //         .text(i.datos.marca, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 7, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'right',
        //         })
        //         .font('Helvetica');

        //     doc
        //         .font('Helvetica-Bold').text(`Modelo:`, (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 7, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left'
        //         })
        //         .font('Helvetica');
        //     doc
        //         .text(i.datos.modelo, (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 7, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'right'
        //         });

        //     doc
        //         .font('Helvetica-Bold')
        //         .text(`Serial:`, 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 7, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left'
        //         }).font('Helvetica');

        //     doc
        //         .text(i.datos.serial, 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 7, {
        //             width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'right'
        //         });

        //     /* LINEA 2 PORRATEO*/
        //     doc
        //         .font('Helvetica-Bold')
        //         .text(`Banco:`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 8, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left',
        //         })
        //         .font('Helvetica');

        //     doc
        //         .text(i.datos.banco, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 8, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'right',
        //         })
        //         .font('Helvetica');

        //     doc
        //         .font('Helvetica-Bold').text(`N° Afiliación:`, (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 8, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left'
        //         })
        //         .font('Helvetica');
        //     doc
        //         .text(i.datos.numero_afiliado, (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 8, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'right'
        //         });

        //     doc
        //         .font('Helvetica-Bold')
        //         .text(`Terminal:`, 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 8, {
        //             width: (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left'
        //         }).font('Helvetica');

        //     doc
        //         .text(i.datos.terminal, 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 8, {
        //             width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'right'
        //         });

        //     /* SEPARADOR COLOR #B5C6E6*/
        //     doc
        //         .lineWidth(6)
        //         .lineCap('butt')
        //         .moveTo(pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 9.2)
        //         .lineTo(doc.page.width - pdfMaker.VALUES.MARGIN_RIGHT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 9.2)
        //         .stroke('#B5C6E6');

        //     let servicios: any = [];
        //     if (!historical) {

        //         const serviciosSnap = await db
        //             .collection('servicios')
        //             .where('serial', '==', i.datos.serial)
        //             .where('procesado', '==', false)
        //             .orderBy('fecha_registro', 'asc')
        //             .get();

        //         console.log('sale en el get')

        //         serviciosSnap.forEach((qdoc) => {
        //             servicios.push(qdoc.data());
        //         });

        //         let saldoTotal = 0.00;
        //         servicios.forEach((serv: any) => {
        //             if (!serv.procesado) {
        //                 saldoTotal += parseFloat(serv.saldo_servicio) || parseFloat(serv.monto_pagar);
        //             }
        //         });

        //         pdfMaker.saldoGlobal += saldoTotal;

        //         docPages.push(doc.bufferedPageRange().count - 1);

        //         await pdfMaker.setSubHeader(historical, i.datos.nombre_plan, servicios, saldoTotal.toString());

        //         if (servicios.length > 0) {
        //             /* HEADER SERVICIOS*/
        //             doc
        //                 .font('Helvetica-Bold')
        //                 .text(`Mes facturado:`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                     width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                     align: 'center',
        //                 });

        //             doc.text('Monto Cuota USD', (doc.page.width / 4) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                 width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                 align: 'center',
        //             });

        //             doc.text(`Monto Cobrado`, 2 * (doc.page.width / 4) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                 width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                 align: 'center'
        //             });

        //             doc.text('Saldo', 3 * (doc.page.width / 4) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                 width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                 align: 'center'
        //             }).font('Helvetica');

        //             pdfMaker.setServicios(servicios);
        //         }
        //     } else {

        //         doc.fontSize(11);

        //         const serviciosSnap = await db
        //             .collection('servicios')
        //             .where('serial', '==', i.datos.serial)
        //             .orderBy('fecha_registro', 'asc')
        //             .get();

        //         //console.log('sale de historical')

        //         serviciosSnap.forEach((qdoc) => {
        //             servicios.push(qdoc.data());
        //         });

        //         const serviciosProcesados = servicios.filter((serv: any) => serv.procesado);

        //         let saldoTotal = 0.00;
        //         servicios.forEach((serv: any) => {
        //             if (!serv.procesado) {
        //                 saldoTotal += parseFloat(serv.saldo_servicio) || parseFloat(serv.monto_pagar);
        //             }
        //         });

        //         pdfMaker.saldoGlobal += saldoTotal;

        //         docPages.push(doc.bufferedPageRange().count - 1);

        //         await pdfMaker.setSubHeader(historical, i.datos.nombre_plan, serviciosProcesados, saldoTotal.toString());

        //         //console.log(serviciosProcesados)
        //         if (serviciosProcesados.length > 0) {

        //             /* HEADER SERVICIOS*/
        //             doc
        //                 .font('Helvetica-Bold')
        //                 .text(`No`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                     width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                     align: 'center',
        //                 });

        //             doc
        //                 .text(`Mes facturado`, (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                     width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                     align: 'center',
        //                 });

        //             doc.text('Monto Cuota USD', 2 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                 width: (doc.page.width / 6) - pdfMaker.VALUES.MARGIN_RIGHT,
        //                 align: 'center',
        //             });

        //             doc.text(`Fecha de pago`, 3 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                 width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                 align: 'center'
        //             });

        //             doc.text('Monto cuota Bs.', 4 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                 width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                 align: 'center'
        //             });

        //             doc.text('Forma de Pago', 4.7 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 12, {
        //                 width: (doc.page.width / 4.5) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
        //                 align: 'center'
        //             }).font('Helvetica');

        //             pdfMaker.setHistoricalServicios(serviciosProcesados, i);

        //         }
        //         doc.fontSize(12);
        //     }


        //     if (i.nro != prorrateo.length) {
        //         doc.addPage();
        //     }

        // }

        // docPages.forEach(page => {
        //     doc.switchToPage(page);
        //     doc.font('Helvetica-Bold')
        //         .text(`Total Deuda Cuotas USD:`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 4.8, {
        //             width: doc.page.width / 3 - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left',
        //         }).font('Helvetica')
        //     doc.text(pdfMaker.saldoGlobal.toString(), 0.75 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 4.8, {
        //         width: 2 * (doc.page.width / 3) - pdfMaker.VALUES.MARGIN_RIGHT,
        //         align: 'left',
        //     }).font('Helvetica')
        // });

        // doc.pipe(res);
        // doc.end();

        // } else {

        //     /* SEPARADOR */
        //     doc
        //         .lineWidth(2)
        //         .lineCap('butt')
        //         .moveTo(pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 5.2)
        //         .lineTo(doc.page.width - pdfMaker.VALUES.MARGIN_RIGHT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 5.2)
        //         .stroke()

        //     /* MENSAJE CUANDO NO HAY EQUIPOS */
        //     doc
        //         .fontSize(10)
        //         .text(`No se encontraron cuotas pendientes.`, pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 5.7, {
        //             width: doc.page.width - pdfMaker.VALUES.MARGIN_RIGHT,
        //             align: 'left',
        //         })
        //     console.log('No hay prorrateo.')

        //     doc.pipe(res);
        //     doc.end();
        // }

    }
    /* 
        private async setSubHeader(historical: boolean, nombre_plan: string, servicios: any, saldo: string) {
    
            let plan: any = {};
            const planes = await db.collection('planes').where('nombre', '==', nombre_plan).limit(1).get().then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
                plan = querySnapshot.docs.pop()?.data();
            }).catch((error) => {
                console.log(error);
            });
    
            let cuotas = 0;
    
            if (historical) {
                servicios.forEach((serv: any) => {
                    cuotas += serv.movimientos_saldo.ultimo_movimiento;
                });
            } else {
                servicios.forEach((serv: any) => {
                    cuotas += 1;
                });
            }
    
            if (!historical) {
                //Columna antes de servicios
                doc
                    .font('Helvetica-Bold')
                    .text('N° Cuotas Pendientes', pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                        width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                        align: 'center',
                    }).font('Helvetica')
            } else {
                //Columna antes de servicios
                doc
                    .font('Helvetica-Bold')
                    .text('N° Cuotas Pagadas', pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                        width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                        align: 'center',
                    }).font('Helvetica')
            }
    
            doc
                .text(cuotas.toString(), pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                    width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                    align: 'right',
                })
    
            doc
                .font('Helvetica-Bold')
                .text('Monto Cuota USD', (doc.page.width / 3.3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                    width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                    align: 'left',
                }).font('Helvetica')
    
            doc
                .text(plan.monto, (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                    width: (doc.page.width / 3.6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                    align: 'right',
                })
    
            if (!historical) {
                doc
                    .font('Helvetica-Bold')
                    .text('Saldo', 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                        width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                        align: 'left'
                    }).font('Helvetica')
    
                doc
                    .text(saldo, 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                        width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                        align: 'center'
                    })
            } else {
                doc
                    .font('Helvetica-Bold')
                    .text('Monto Cuota Bs.:', 1.65 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                        width: (doc.page.width / 2.5) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                        align: 'left'
                    }).font('Helvetica')
    
                let tasa = await pdfMaker.getTasaDolares();
                let myNumber = (plan.monto * tasa).toLocaleString('es-VE', { style: 'currency', currency: 'VEF', minimumFractionDigits: 2 });
                myNumber = myNumber.slice(4, myNumber.length) + ' VEF';
    
                doc
                    .text(myNumber, 2 * (doc.page.width / 3) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * 10.5, {
                        width: (doc.page.width / 3) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
                        align: 'right'
                    })
            }
        }
    
        private setServicios(servicios: any) {
            //console.log(servicios);
            if (servicios) {
                let aux = 0;
                let old = 0;
                servicios.forEach((s: any) => {
                    aux = aux + 1;
    
                    if (pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux) > doc.page.height - 80) {
                        doc.addPage();
                        pdfMaker.VALUES.PAY_DISTANCE = 0;
                        pdfMaker.VALUES.HEAD_HEIGHT = 80;
                        old += aux;
                        aux = 0;
                    }
    
    //                 /* ROW SERVICIOS*/
    //                 let date = s.fecha_registro as FirebaseFirestore.Timestamp;
    //                 //console.log(s.fecha_registro);
    //                 doc
    //                     .font('Helvetica-Bold')
    //                     .text(date.toDate().toLocaleDateString("es", { month: 'short', day: 'numeric' }).replace(' ', '-').replace('.', ''), pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                         width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                         align: 'center',
    //                     }).font('Helvetica')

    //                 doc.text(s.monto_pagar, (doc.page.width / 4) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                     width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                     align: 'center',
    //                 })

    //                 doc.text(s.saldo_servicio ? (s.monto_pagar - s.saldo_servicio).toString() : '0', 2 * (doc.page.width / 4) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                     width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                     align: 'center'
    //                 })

    //                 doc.text(s.saldo_servicio ? s.saldo_servicio : s.monto_pagar, 3 * (doc.page.width / 4) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                     width: (doc.page.width / 4) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                     align: 'center'
    //                 })


    //             });
    //         }

    //         pdfMaker.VALUES.PAY_DISTANCE = 12.4;
    //         pdfMaker.VALUES.HEAD_HEIGHT = 85;

    //     }

    //     private setHistoricalServicios(servicios: any, prorrateo: any) {
    //         //console.log(servicios);
    //         if (servicios) {
    //             let aux = 0;
    //             let old = 0;
    //             servicios.forEach(async (s: any) => {
    //                 if (s.procesado == 'SI') {
    //                     console.log(typeof s.movimientos_saldo);
    //                     if (s.movimientos_saldo) {
    //                         for (let index = 1; index <= s.movimientos_saldo.ultimo_movimiento; index++) {

    //                             aux = aux + 1;

    //                             if (pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux) > doc.page.height - 80) {
    //                                 doc.addPage();
    //                                 pdfMaker.VALUES.PAY_DISTANCE = 0;
    //                                 pdfMaker.VALUES.HEAD_HEIGHT = 80;
    //                                 old += aux;
    //                                 aux = 0;
    //                             }

    //                             //console.log(pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux));
    //                             //console.log(doc.page.height - 2 * pdfMaker.VALUES.MARGIN_BOTTOM)

    //                             /* ROW SERVICIOS*/
    //                             let date = s.fecha_registro as FirebaseFirestore.Timestamp;
    //                             let datePago = s.movimientos_saldo[index.toString()].fecha_conciliacion as FirebaseFirestore.Timestamp;
    //                             let tasa = 0;
    //                             console.log(tasa)

    //                             //console.log(s.fecha_registro);
    //                             doc
    //                                 .font('Helvetica-Bold')
    //                                 .text((aux + old).toString(), pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                                     width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                                     align: 'center',
    //                                 }).font('Helvetica')

    //                             doc
    //                                 .font('Helvetica-Bold')
    //                                 .text(date.toDate().toLocaleDateString("es", { month: 'short', day: 'numeric' }).replace(' ', '-').replace('.', ''), (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                                     width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                                     align: 'center',
    //                                 }).font('Helvetica')

    //                             doc.text(s.movimientos_saldo[index.toString()].pago, 2 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                                 width: (doc.page.width / 6) - pdfMaker.VALUES.MARGIN_RIGHT,
    //                                 align: 'center',
    //                             })

    //                             doc.text(s.pago_registrado ? datePago.toDate().toLocaleDateString() : "N/A", 3 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                                 width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                                 align: 'center'
    //                             })

    //                             //console.log(prorrateo);
    //                             doc.text((s.monto_pagar * tasa).toString(), 4 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                                 width: (doc.page.width / 6) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                                 align: 'center'
    //                             })

    //                             doc.text(s.modo_pago_plan, 4.7 * (doc.page.width / 6) + pdfMaker.VALUES.MARGIN_LEFT, pdfMaker.VALUES.HEAD_HEIGHT + pdfMaker.VALUES.LINE_GAP * (pdfMaker.VALUES.PAY_DISTANCE + aux), {
    //                                 width: (doc.page.width / 4.5) - 2 * pdfMaker.VALUES.MARGIN_RIGHT,
    //                                 align: 'center'
    //                             })


    //                         }
    //                     }
    //                 }

    //             });
    //         }
    //         pdfMaker.VALUES.PAY_DISTANCE = 12.4;
    //         pdfMaker.VALUES.HEAD_HEIGHT = 85;
    //     }

    //     async getTasa(date: FirebaseFirestore.Timestamp): Promise<number> {
    //         var tasa: number = 0.00;

    //         await db
    //             .collection('tasas')
    //             .where('fecha_registro', '<=', date)
    //             .where('fecha_inactividad', '>', date)
    //             .where('moneda', '==', 'DOLARES')
    //             .get().then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
    //                 tasa = parseFloat(querySnapshot.docs.pop()?.data().nombre);
    //             }).catch((error) => {
    //                 console.log(error);
    //             });

    //         return tasa;
    //     }

    //     async getTasaDolares(): Promise<number> {
    //         var tasa: number = 0.00;

    //         await db
    //             .collection('tasas')
    //             .where('activo', '==', true)
    //             .where('moneda', '==', 'DOLARES')
    //             .get().then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
    //                 tasa = parseFloat(querySnapshot.docs.pop()?.data().nombre);
    //             }).catch((error) => {
    //                 console.log(error);
    //             });

    //         return tasa;
    //     }
    //  */
}



