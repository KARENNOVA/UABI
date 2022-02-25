import React, { FC } from 'react';

interface FormPros {
    values_contract?: any;
}

const ContractViewForm : FC<FormPros> = ({ values_contract }) => {
    console.log(values_contract)
    return (
        <div className="col-3-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Información del Contrato
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Número de Contrato</label>
                                <div className="my-3">{values_contract?.consecutive}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Tipo de Contrato</label>
                                <div className="my-3">{values_contract?.type_contract}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Código Activo</label>
                                <div className="my-3"></div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Fecha de suscripción</label>
                                <div className="my-3">{values_contract?.subscription_date}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Fecha de inicio</label>
                                <div className="my-3">{values_contract?.subscription_date}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Fecha de terminación</label>
                                <div className="my-3">{values_contract?.finish_date}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Área a disponer</label>
                                <div className="my-3">{values_contract?.dispose_area}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">UABI es la encargada del contrato</label>
                                <div className="my-3">{values_contract?.manager_sabi}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 movimiento">
                                <label htmlFor="">Objeto del contrato</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {values_contract?.object_contract}
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

export default ContractViewForm;
