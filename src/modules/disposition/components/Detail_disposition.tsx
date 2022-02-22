import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

interface DispositionFormPros {
    //dispositionType: string;
    realEstate: any;
    precontractual: any;
    contractual: any;
}

const ViewDetailDisposition: FC<DispositionFormPros> = ({ realEstate, precontractual, contractual }) => {
    const history = useHistory();
    return (
        <div className="col-12">
            <div className="content_box_table">
                <div className="title" style={{ borderBottom: '1px solid #e2e4e4' }}>
                    Bien inmueble:{' '}
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label style={{ color: '#8d8c8c' }} htmlFor="">
                                    ID
                                </label>
                                <div className="my-3" >{realEstate?.id}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Nombre del Inmuebles</label>
                                <div className="my-3" >{realEstate?.name}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Matrícula</label>
                                <div className="my-3" >{realEstate?.registry_number}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Disposición</label>
                                <div className="my-3">{precontractual?.type_disposition ?? "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Fecha de la ultima inspección</label>
                                <div className="row">
                                    <div className="col-4 my-3" style={{ width: 'auto', padding: '1em' }}>
                                        fecha
                                    </div>
                                    <div className="col my-3">
                                        <button type="button" className="btn btn-outline-primary  btn-sm">
                                            ver Inspección
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Estado de contratación</label>
                                {contractual ?
                                    <div className="my-3">Contratual</div>
                                    :
                                    precontractual ?
                                        <div className="my-3">Contratual</div>
                                        : "-"
                                }
                            </div>

                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Historial de contratos</label>
                                <div className="my-3">
                                    <button type="button" className="btn btn-outline-primary  btn-sm"
                                         onClick={() =>
                                            history.push({ pathname: `/disposition/edit/${realEstate?.id}` })
                                        }
                                    >
                                        ver Historial
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Informe de supervisión</label>
                                <div className="my-3">
                                    <button type="button" className="btn btn-outline-primary  btn-sm">
                                        ver informe de supervición
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">CBML</label>
                                <div className="my-3">{realEstate?.address?.cbmls?.uabi}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Dirección</label>
                                <div className="my-3">{realEstate?.address?.address}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Etapa Precontractual</label>
                                <div className=" my-3">
                                    {precontractual ?
                                        <button type="button" className="btn btn-outline-primary  btn-sm"
                                            onClick={() =>
                                                history.push({ pathname: `/dispositions/precontractual/view/${realEstate?.active_code}`, state: { realEstate } })

                                            }
                                        >
                                            ver estudio Previo
                                        </button>
                                        :
                                        <div className="my-3">No se ha registrado un estudio previo</div>
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Contrato Vigente</label>
                                <div className=" my-3">
                                    {contractual ?
                                        <button type="button" className="btn btn-outline-primary  btn-sm">
                                            ver Contrato
                                        </button>
                                        :
                                        <div className="my-3">Sin contrato Vigente</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 movimiento">
                                <label htmlFor="">Descripción del inmueble</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {realEstate?.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailDisposition;
