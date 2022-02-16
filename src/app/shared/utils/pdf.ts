//import dateFormat from 'dateformat';
import {jsPDF} from "jspdf";
//import db from '../firebase';

class AccountController {

    private VALUES = {
        HEAD_HEIGHT: 85,
        MARGIN_TOP: 40,
        MARGIN_LEFT: 25,
        MARGIN_RIGHT: 25,
        MARGIN_BOTTOM: 40,
        LINE_GAP: 25,
        PAY_DISTANCE: 12.4
    }

    private doc!: jsPDF;
    private docPages = [0,];
    private saldoGlobal: number = 0;

    public async getPdf(req: Request, res: Response) {

        var rif = req.params.rif;
        var lista: any;
        var historical = Boolean(req.query.historical) || false;

        await db
            .collection('clientes')
            .where('rif', '==', rif)
            .get()
            .then((doc: FirebaseFirestore.QuerySnapshot) => {
                if (!doc.empty) {
                    var values = {
                        datos: doc.docs.pop()?.data()
                    }
                    lista = values;
                } else {
                    lista = false;
                }
            })
            .catch((error) => {
                console.error(error);
                lista = false;
            });

        if (lista) {
            var prorrateo: any = [];
            var datos: {} = {};
            var i = 0;
            await db
                .collection('pagos')
                .where('rif', '==', lista.datos.rif)
                .where('concepto', '==', "PRORRATEO")
                .get()
                .then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
                    querySnapshot.forEach(async (doc) => {
                        i = i + 1;

                        console.log('finaliza un serivicio')
                        datos = {
                            nro: i,
                            datos: doc.data(),
                        }
                        //console.log(datos);
                        prorrateo.push(datos);
                    });
                }).catch((error) => {
                    console.log(error);
                })
            //console.log(prorrateo);
            accountController.createPdf(lista, prorrateo, res, historical);
        } else {
            res.status(404).send({ error: 'Rif invalido.' });
        }

    }

    private async createPdf(lista: any, prorrateo: any, res: Response, historical: boolean = false) {

        accountController.saldoGlobal = 0;
        accountController.VALUES.HEAD_HEIGHT = 85;
        accountController.VALUES.PAY_DISTANCE = 12.4;
        accountController.docPages = [];

        console.log('se crea pdf')

        let fecha_hoy = dateFormat(new Date(), 'dd/mm/yyyy');
        let fecha_hoy_piso = dateFormat(new Date(), 'dd_mm_yyyy');
        accountController.doc = new pdf({ bufferPages: true });

        if (!historical) {
            accountController.doc.info['Title'] = 'Estado_Cuenta_Cliente_' + lista.datos.rif + "_" + fecha_hoy_piso + '.pdf';
            res.setHeader('Content-disposition', 'inline; filename=' + 'Estado_Cuenta_Cliente_' + lista.datos.rif + "_" + fecha_hoy_piso + '.pdf')
        } else {
            accountController.doc.info['Title'] = 'Historico_Cobranzas_Cliente_' + lista.datos.rif + "_" + fecha_hoy_piso + '.pdf';
            res.setHeader('Content-disposition', 'inline; filename=' + 'Historico_Cobranzas_Cliente_' + lista.datos.rif + "_" + fecha_hoy_piso + '.pdf')
        }

        accountController.doc.fontSize(12);

        if (prorrateo.length > 0) {
            for (const i of prorrateo) {

                /* START HEADER  */
                /* IMAGEN CONSULPAGOS */
                accountController.doc.image('src/assets/logo.png', accountController.VALUES.MARGIN_TOP, accountController.VALUES.MARGIN_LEFT, { width: 200 })

                if (!historical) {
                    /* TÍTULO ESTADO DE CUENTA*/
                    accountController.doc.font('Helvetica-Bold').text('Estado de Cuenta', accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT / 2, {
                        width: accountController.doc.page.width - accountController.VALUES.MARGIN_RIGHT - 40,
                        align: 'right',
                    }).font('Helvetica')
                } else {
                    /* TÍTULO HISTORICO*/
                    accountController.doc.font('Helvetica-Bold').text('Histórico Cobranzas', accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT / 2, {
                        width: accountController.doc.page.width - accountController.VALUES.MARGIN_RIGHT - 40,
                        align: 'right',
                    }).font('Helvetica')
                }

                /* SEPARADOR */
                accountController.doc
                    .lineWidth(2)
                    .lineCap('butt')
                    .moveTo(accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT)
                    .lineTo(accountController.doc.page.width - accountController.VALUES.MARGIN_RIGHT, accountController.VALUES.HEAD_HEIGHT)
                    .stroke()

                /* LINEA 1 */
                accountController.doc.font('Helvetica-Bold')
                    .text(`Rif:`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 1.5, {
                        width: accountController.doc.page.width / 3 - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left',
                    }).font('Helvetica')
                accountController.doc.text(lista.datos.rif, 0.75 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 1.5, {
                    width: 2 * (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                    align: 'left',
                }).font('Helvetica')
                accountController.doc.font('Helvetica-Bold').text(`Fecha de Emisión:`, accountController.doc.page.width / 2 + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 1.5, {
                    width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                    align: 'center'
                }).font('Helvetica')

                accountController.doc.text(fecha_hoy, 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 1.5, {
                    width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'right'
                })

                /* LINEA 2 */
                accountController.doc.font('Helvetica-Bold')
                    .text(`Razón Social:`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 2.5, {
                        width: accountController.doc.page.width / 3 - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left',
                    }).font('Helvetica')
                accountController.doc.text(lista.datos.razon_social, 0.75 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 2.5, {
                    width: 2 * (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                    align: 'left',
                }).font('Helvetica')

                /* LINEA 3 (DESPUES DEL HEADER)*/
                accountController.doc.font('Helvetica-Bold')
                    .text(`Dirección:`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 3.5, {
                        width: accountController.doc.page.width / 3 - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left',
                    }).font('Helvetica')
                //console.log(lista.datos)
                const direccion = lista.datos.direccion ? lista.datos.direccion : lista.datos.direccion_fiscal;
                accountController.doc.text(direccion, 0.75 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 3.5, {
                    width: 2.25 * (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'left',
                }).font('Helvetica')


                /* END HEADER  */

                //console.log(i);
                /* SEPARADOR COLOR #B5C6E6*/
                accountController.doc
                    .lineWidth(6)
                    .lineCap('butt')
                    .moveTo(accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 6.2)
                    .lineTo(accountController.doc.page.width - accountController.VALUES.MARGIN_RIGHT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 6.2)
                    .stroke('#B5C6E6');

                /* LINEA 1 PORRATEO*/
                accountController.doc
                    .font('Helvetica-Bold')
                    .text(`Marca:`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 7, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left',
                    })
                    .font('Helvetica');

                accountController.doc
                    .text(i.datos.marca, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 7, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'right',
                    })
                    .font('Helvetica');

                accountController.doc
                    .font('Helvetica-Bold').text(`Modelo:`, (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 7, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left'
                    })
                    .font('Helvetica');
                accountController.doc
                    .text(i.datos.modelo, (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 7, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'right'
                    });

                accountController.doc
                    .font('Helvetica-Bold')
                    .text(`Serial:`, 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 7, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left'
                    }).font('Helvetica');

                accountController.doc
                    .text(i.datos.serial, 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 7, {
                        width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                        align: 'right'
                    });

                /* LINEA 2 PORRATEO*/
                accountController.doc
                    .font('Helvetica-Bold')
                    .text(`Banco:`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 8, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left',
                    })
                    .font('Helvetica');

                accountController.doc
                    .text(i.datos.banco, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 8, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'right',
                    })
                    .font('Helvetica');

                accountController.doc
                    .font('Helvetica-Bold').text(`N° Afiliación:`, (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 8, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left'
                    })
                    .font('Helvetica');
                accountController.doc
                    .text(i.datos.numero_afiliado, (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 8, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'right'
                    });

                accountController.doc
                    .font('Helvetica-Bold')
                    .text(`Terminal:`, 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 8, {
                        width: (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left'
                    }).font('Helvetica');

                accountController.doc
                    .text(i.datos.terminal, 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 8, {
                        width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                        align: 'right'
                    });

                /* SEPARADOR COLOR #B5C6E6*/
                accountController.doc
                    .lineWidth(6)
                    .lineCap('butt')
                    .moveTo(accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 9.2)
                    .lineTo(accountController.doc.page.width - accountController.VALUES.MARGIN_RIGHT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 9.2)
                    .stroke('#B5C6E6');

                let servicios: any = [];
                if (!historical) {

                    const serviciosSnap = await db
                        .collection('servicios')
                        .where('serial', '==', i.datos.serial)
                        .where('procesado', '==', false)
                        .orderBy('fecha_registro', 'asc')
                        .get();

                    console.log('sale en el get')

                    serviciosSnap.forEach((qdoc) => {
                        servicios.push(qdoc.data());
                    });

                    let saldoTotal = 0.00;
                    servicios.forEach((serv: any) => {
                        if (!serv.procesado) {
                            saldoTotal += parseFloat(serv.saldo_servicio) || parseFloat(serv.monto_pagar);
                        }
                    });

                    accountController.saldoGlobal += saldoTotal;

                    accountController.docPages.push(accountController.doc.bufferedPageRange().count - 1);

                    await accountController.setSubHeader(historical, i.datos.nombre_plan, servicios, saldoTotal.toString());

                    if (servicios.length > 0) {
                        /* HEADER SERVICIOS*/
                        accountController.doc
                            .font('Helvetica-Bold')
                            .text(`Mes facturado:`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                                width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                align: 'center',
                            });

                        accountController.doc.text('Monto Cuota USD', (accountController.doc.page.width / 4) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                            width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                            align: 'center',
                        });

                        accountController.doc.text(`Monto Cobrado`, 2 * (accountController.doc.page.width / 4) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                            width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                            align: 'center'
                        });

                        accountController.doc.text('Saldo', 3 * (accountController.doc.page.width / 4) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                            width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                            align: 'center'
                        }).font('Helvetica');

                        accountController.setServicios(servicios);
                    }
                } else {

                    accountController.doc.fontSize(11);

                    const serviciosSnap = await db
                        .collection('servicios')
                        .where('serial', '==', i.datos.serial)
                        .orderBy('fecha_registro', 'asc')
                        .get();

                    //console.log('sale de historical')

                    serviciosSnap.forEach((qdoc) => {
                        servicios.push(qdoc.data());
                    });

                    const serviciosProcesados = servicios.filter((serv: any) => serv.procesado);

                    let saldoTotal = 0.00;
                    servicios.forEach((serv: any) => {
                        if (!serv.procesado) {
                            saldoTotal += parseFloat(serv.saldo_servicio) || parseFloat(serv.monto_pagar);
                        }
                    });

                    accountController.saldoGlobal += saldoTotal;

                    accountController.docPages.push(accountController.doc.bufferedPageRange().count - 1);

                    await accountController.setSubHeader(historical, i.datos.nombre_plan, serviciosProcesados, saldoTotal.toString());

                    //console.log(serviciosProcesados)
                    if (serviciosProcesados.length > 0) {

                        /* HEADER SERVICIOS*/
                        accountController.doc
                            .font('Helvetica-Bold')
                            .text(`No`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                                width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                align: 'center',
                            });

                        accountController.doc
                            .text(`Mes facturado`, (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                                width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                align: 'center',
                            });

                        accountController.doc.text('Monto Cuota USD', 2 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                            width: (accountController.doc.page.width / 6) - accountController.VALUES.MARGIN_RIGHT,
                            align: 'center',
                        });

                        accountController.doc.text(`Fecha de pago`, 3 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                            width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                            align: 'center'
                        });

                        accountController.doc.text('Monto cuota Bs.', 4 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                            width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                            align: 'center'
                        });

                        accountController.doc.text('Forma de Pago', 4.7 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 12, {
                            width: (accountController.doc.page.width / 4.5) - 2 * accountController.VALUES.MARGIN_RIGHT,
                            align: 'center'
                        }).font('Helvetica');

                        accountController.setHistoricalServicios(serviciosProcesados, i);

                    }
                    accountController.doc.fontSize(12);
                }


                if (i.nro != prorrateo.length) {
                    accountController.doc.addPage();
                }

            }

            accountController.docPages.forEach(page => {
                accountController.doc.switchToPage(page);
                accountController.doc.font('Helvetica-Bold')
                    .text(`Total Deuda Cuotas USD:`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 4.8, {
                        width: accountController.doc.page.width / 3 - accountController.VALUES.MARGIN_RIGHT,
                        align: 'left',
                    }).font('Helvetica')
                accountController.doc.text(accountController.saldoGlobal.toString(), 0.75 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 4.8, {
                    width: 2 * (accountController.doc.page.width / 3) - accountController.VALUES.MARGIN_RIGHT,
                    align: 'left',
                }).font('Helvetica')
            });

            accountController.doc.pipe(res);
            accountController.doc.end();

        } else {

            /* SEPARADOR */
            accountController.doc
                .lineWidth(2)
                .lineCap('butt')
                .moveTo(accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 5.2)
                .lineTo(accountController.doc.page.width - accountController.VALUES.MARGIN_RIGHT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 5.2)
                .stroke()

            /* MENSAJE CUANDO NO HAY EQUIPOS */
            accountController.doc
                .fontSize(10)
                .text(`No se encontraron cuotas pendientes.`, accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 5.7, {
                    width: accountController.doc.page.width - accountController.VALUES.MARGIN_RIGHT,
                    align: 'left',
                })
            console.log('No hay prorrateo.')

            accountController.doc.pipe(res);
            accountController.doc.end();
        }

    }

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
            accountController.doc
                .font('Helvetica-Bold')
                .text('N° Cuotas Pendientes', accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                    width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'center',
                }).font('Helvetica')
        } else {
            //Columna antes de servicios
            accountController.doc
                .font('Helvetica-Bold')
                .text('N° Cuotas Pagadas', accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                    width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'center',
                }).font('Helvetica')
        }

        accountController.doc
            .text(cuotas.toString(), accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                align: 'right',
            })

        accountController.doc
            .font('Helvetica-Bold')
            .text('Monto Cuota USD', (accountController.doc.page.width / 3.3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                align: 'left',
            }).font('Helvetica')

        accountController.doc
            .text(plan.monto, (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                width: (accountController.doc.page.width / 3.6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                align: 'right',
            })

        if (!historical) {
            accountController.doc
                .font('Helvetica-Bold')
                .text('Saldo', 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                    width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'left'
                }).font('Helvetica')

            accountController.doc
                .text(saldo, 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                    width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'center'
                })
        } else {
            accountController.doc
                .font('Helvetica-Bold')
                .text('Monto Cuota Bs.:', 1.65 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                    width: (accountController.doc.page.width / 2.5) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'left'
                }).font('Helvetica')

            let tasa = await accountController.getTasaDolares();
            let myNumber = (plan.monto * tasa).toLocaleString('es-VE', { style: 'currency', currency: 'VEF', minimumFractionDigits: 2 });
            myNumber = myNumber.slice(4, myNumber.length) + ' VEF';

            accountController.doc
                .text(myNumber, 2 * (accountController.doc.page.width / 3) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * 10.5, {
                    width: (accountController.doc.page.width / 3) - 2 * accountController.VALUES.MARGIN_RIGHT,
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

                if (accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux) > accountController.doc.page.height - 80) {
                    accountController.doc.addPage();
                    accountController.VALUES.PAY_DISTANCE = 0;
                    accountController.VALUES.HEAD_HEIGHT = 80;
                    old += aux;
                    aux = 0;
                }

                /* ROW SERVICIOS*/
                let date = s.fecha_registro as FirebaseFirestore.Timestamp;
                //console.log(s.fecha_registro);
                accountController.doc
                    .font('Helvetica-Bold')
                    .text(date.toDate().toLocaleDateString("es", { month: 'short', day: 'numeric' }).replace(' ', '-').replace('.', ''), accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                        width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                        align: 'center',
                    }).font('Helvetica')

                accountController.doc.text(s.monto_pagar, (accountController.doc.page.width / 4) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                    width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'center',
                })

                accountController.doc.text(s.saldo_servicio ? (s.monto_pagar - s.saldo_servicio).toString() : '0', 2 * (accountController.doc.page.width / 4) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                    width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'center'
                })

                accountController.doc.text(s.saldo_servicio ? s.saldo_servicio : s.monto_pagar, 3 * (accountController.doc.page.width / 4) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                    width: (accountController.doc.page.width / 4) - 2 * accountController.VALUES.MARGIN_RIGHT,
                    align: 'center'
                })


            });
        }

        accountController.VALUES.PAY_DISTANCE = 12.4;
        accountController.VALUES.HEAD_HEIGHT = 85;

    }

    private setHistoricalServicios(servicios: any, prorrateo: any) {
        //console.log(servicios);
        if (servicios) {
            let aux = 0;
            let old = 0;
            servicios.forEach(async (s: any) => {
                if (s.procesado == 'SI') {
                    console.log(typeof s.movimientos_saldo);
                    if (s.movimientos_saldo) {
                        for (let index = 1; index <= s.movimientos_saldo.ultimo_movimiento; index++) {

                            aux = aux + 1;

                            if (accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux) > accountController.doc.page.height - 80) {
                                accountController.doc.addPage();
                                accountController.VALUES.PAY_DISTANCE = 0;
                                accountController.VALUES.HEAD_HEIGHT = 80;
                                old += aux;
                                aux = 0;
                            }

                            //console.log(accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux));
                            //console.log(accountController.doc.page.height - 2 * accountController.VALUES.MARGIN_BOTTOM)

                            /* ROW SERVICIOS*/
                            let date = s.fecha_registro as FirebaseFirestore.Timestamp;
                            let datePago = s.movimientos_saldo[index.toString()].fecha_conciliacion as FirebaseFirestore.Timestamp;
                            let tasa = 0;
                            console.log(tasa)

                            //console.log(s.fecha_registro);
                            accountController.doc
                                .font('Helvetica-Bold')
                                .text((aux + old).toString(), accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                                    width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                    align: 'center',
                                }).font('Helvetica')

                            accountController.doc
                                .font('Helvetica-Bold')
                                .text(date.toDate().toLocaleDateString("es", { month: 'short', day: 'numeric' }).replace(' ', '-').replace('.', ''), (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                                    width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                    align: 'center',
                                }).font('Helvetica')

                            accountController.doc.text(s.movimientos_saldo[index.toString()].pago, 2 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                                width: (accountController.doc.page.width / 6) - accountController.VALUES.MARGIN_RIGHT,
                                align: 'center',
                            })

                            accountController.doc.text(s.pago_registrado ? datePago.toDate().toLocaleDateString() : "N/A", 3 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                                width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                align: 'center'
                            })

                            //console.log(prorrateo);
                            accountController.doc.text((s.monto_pagar * tasa).toString(), 4 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                                width: (accountController.doc.page.width / 6) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                align: 'center'
                            })

                            accountController.doc.text(s.modo_pago_plan, 4.7 * (accountController.doc.page.width / 6) + accountController.VALUES.MARGIN_LEFT, accountController.VALUES.HEAD_HEIGHT + accountController.VALUES.LINE_GAP * (accountController.VALUES.PAY_DISTANCE + aux), {
                                width: (accountController.doc.page.width / 4.5) - 2 * accountController.VALUES.MARGIN_RIGHT,
                                align: 'center'
                            })


                        }
                    }
                }

            });
        }
        accountController.VALUES.PAY_DISTANCE = 12.4;
        accountController.VALUES.HEAD_HEIGHT = 85;
    }

    async getTasa(date: FirebaseFirestore.Timestamp): Promise<number> {
        var tasa: number = 0.00;

        await db
            .collection('tasas')
            .where('fecha_registro', '<=', date)
            .where('fecha_inactividad', '>', date)
            .where('moneda', '==', 'DOLARES')
            .get().then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
                tasa = parseFloat(querySnapshot.docs.pop()?.data().nombre);
            }).catch((error) => {
                console.log(error);
            });

        return tasa;
    }

    async getTasaDolares(): Promise<number> {
        var tasa: number = 0.00;

        await db
            .collection('tasas')
            .where('activo', '==', true)
            .where('moneda', '==', 'DOLARES')
            .get().then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
                tasa = parseFloat(querySnapshot.docs.pop()?.data().nombre);
            }).catch((error) => {
                console.log(error);
            });

        return tasa;
    }

}

export const accountController = new AccountController();