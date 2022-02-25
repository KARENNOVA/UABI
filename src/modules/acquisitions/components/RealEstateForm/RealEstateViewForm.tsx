import React, { FC } from 'react'
import moment from 'moment';
import { extractMonth } from '../../../../utils';

interface IpolizaFormPros {
    realEstate: any;
    tipology: any;
    inventory: boolean;

}
const RealEstateViewForm: FC<IpolizaFormPros> = ({ realEstate, tipology, inventory }) => {


    const tmpDate = new Date(Number(realEstate?.audit_trail?.created_on));
    const newDate = moment(tmpDate).format('YYYY-MM-DD');

    return (
        <div className="col-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Información del bien inmueble
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Proyecto al que pertenece</label>
                                <div className="my-3">{realEstate?.project?.name || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Tipología</label>
                                <div className="my-3">{tipology?.tipology || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Cuenta contable</label>
                                <div className="my-3">{tipology?.accounting_account || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Dependencia o secretaría</label>
                                <div className="my-3">{realEstate?.dependency?.dependency || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Subsecretaría o subdirección</label>
                                <div className="my-3">{realEstate?.cost_center?.subdependency || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Centro gestor</label>
                                <div className="my-3">{realEstate?.dependency?.management_center || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Centro de costos</label>
                                <div className="my-3">{realEstate?.cost_center?.cost_center || "-"}</div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Nombre del bien inmueble</label>
                                <div className="my-3">{realEstate?.name || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Número de matrícula</label>
                                <div className="my-3">{realEstate?.registry_number || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Código activo</label>
                                <div className="my-3">{realEstate?.active_code || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Tipo de uso</label>
                                <div className="my-3">{realEstate?.destination_type|| "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Valor patrimonial</label>
                                <div className="my-3">{realEstate?.patrimonial_value || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Área total</label>
                                <div className="my-3">{realEstate?.total_area || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Valor de reconstruccón</label>
                                <div className="my-3">{realEstate?.reconstruction_value || "-"}</div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Materiales de construcción</label>
                                <div className="my-3">{(Array.isArray(realEstate?.materials) && realEstate?.materials?.map(m => m)?.join(", ")) || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Porcentaje total</label>
                                <div className="my-3">{realEstate?.total_percentage || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Zona del bien inmueble</label>
                                <div className="my-3">{realEstate?.zone || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Tipo de activo</label>
                                <div className="my-3">{(Array.isArray(realEstate?.active_type) && realEstate?.active_type?.map(active => active)?.join(", ")) || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Área lote</label>
                                <div className="my-3">{realEstate?.plot_area || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Área construcción</label>
                                <div className="my-3">{realEstate?.construction_area || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">CBML</label>
                                <div className="my-3">{realEstate?.address?.cbmls?.uabi || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Dirección</label>
                                <div className="my-3">{realEstate?.address?.address || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Creado por</label>
                                <div className="my-3">{realEstate?.audit_trail?.created_by || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Fecha creación</label>
                                <div className="my-3">{newDate || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Sociedad</label>
                                <div className="my-3">-</div>
                            </div>
                            {inventory &&
                                <div className="col-12 col-md-6 col-lg-3 ">
                                    <label htmlFor="">Póliza</label>
                                    <div className="my-3">
                                        {realEstate?.policy_id === null ?
                                            <div className="my-3">No tiene Póliza</div>
                                            :
                                            <a className="btn btn-outline-primary  btn-sm" href="#poliza">ver Póliza</a>
                                        }
                                    </div>
                                </div>
                            }
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Fecha de inspección</label>
                                <div className="my-3">
                                    <div className="row">
                                        <div className="col">
                                            21/12/2021
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-${inventory ? 3 : 6}`}>
                                <label htmlFor="">fecha finalización contrato</label>
                                <div className="my-3">
                                    21/12/2021
                                    {/* <button type="button" className="btn btn-outline-primary  btn-sm">
                                        ver Disposición
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        {inventory &&
                            <>
                                <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Importe contabilidad</label>
                                        <div className="my-3">{realEstate?.accounting_amount || "-"}</div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Período contable</label>
                                        <div className="my-3">{extractMonth(realEstate?.audit_trail?.created_on) || "-"}</div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Contrapartida</label>
                                        <div className="my-3">{realEstate?.counterpart || "-"}</div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Asignaciones</label>
                                        <div className="my-3">{realEstate?.assignments || "-"}</div>
                                    </div>
                                </div>
                                <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Valor aprovechamiento</label>
                                        <div className="my-3">{realEstate?.exploitation_value || "-"}</div>
                                    </div>

                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Valor de autorización</label>
                                        <div className="my-3">{realEstate?.authorization_value || "-"}</div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Valor del canon</label>
                                        <div className="my-3">{realEstate?.canyon_value || "-"}</div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="">Vida útil años</label>
                                        <div className="my-3">{realEstate?.years_useful_life || "-"}</div>
                                    </div>
                                </div>
                                <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                    <div className="col-12 col-lg-6 col-md-6">
                                        <label htmlFor="">Vida útil períodos</label>
                                        <div className="my-3">{realEstate?.useful_life_periods || "-"}</div>
                                    </div>
                                    <div className="col-12 col-lg-6 col-md-6">
                                        <label htmlFor="">Tipo disposición</label>
                                        <div className="my-3">{realEstate?.disposition_type || "-"}</div>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-6 movimiento">
                                <label htmlFor="">Descripción del inmueble</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {realEstate?.description}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 movimiento">
                                <label htmlFor="">Comentarios</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {/* {realEstate} TODO: agregar comentario */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RealEstateViewForm
