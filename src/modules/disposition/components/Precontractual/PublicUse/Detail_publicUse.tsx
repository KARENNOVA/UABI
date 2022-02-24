import React, { FC } from 'react'

interface IPros {
    precontractual: any;

}

const DetailPublicUse: FC<IPros> = ({ precontractual }) => {
    return (
        <div className="col-3-12">
            <div className="content_box_table">
                <div className="title" style={{ borderBottom: '1px solid #e2e4e4' }}>
                    Estudio previo para uso público
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>

                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Fecha de Registro estudio previo</label>
                                <div className="my-3">{precontractual?.registration_date}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Número Prediación</label>
                                <div className="my-3">{precontractual?.prediation_number}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Fecha de Prediación</label>
                                <div className="my-3">{precontractual?.prediation_date}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Duración del contrato</label>
                                <div className="my-3">{precontractual?.contract_period} meses</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Base asegurable</label>
                                <div className="my-3">{precontractual?.lockable_base}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Valor de avalúo Catastral</label>
                                <div className="my-3">{precontractual?.cadastral_value}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Valor del contrato</label>
                                <div className="my-3">{precontractual?.contract_value}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Tipo de negocio</label>
                                <div className="my-3">{precontractual?.business_type}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-6 movimiento">
                                <label htmlFor="">Riesgos Ambientales</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {precontractual?.environmental_risk}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 movimiento">
                                <label htmlFor="">Destinación de bien Inmueble</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {precontractual?.destination_realestate}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 movimiento">
                                <label htmlFor="">Descripción de linderos</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {precontractual?.boundaries}
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

export default DetailPublicUse
