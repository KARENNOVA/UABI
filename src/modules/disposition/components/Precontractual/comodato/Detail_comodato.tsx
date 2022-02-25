import React, { FC } from 'react'

interface IPros {
    precontractual: any;

}

const DetailComodato: FC<IPros> = ({ precontractual }) => {
    return (
        <div className="col-12">
            <div className="content_box_table">
                <div className="title" style={{ borderBottom: '1px solid #e2e4e4' }}>
                    Estudio Previo Para Comodato
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        {/* comodato */}
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Fecha de registro estudio previo</label>
                                <div className="my-3">{precontractual?.registration_date}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Valor Patrimonial</label>
                                <div className="my-3">-</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Valor comodato</label>
                                <div className="my-3">{precontractual?.loan_value}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Duración del contrato</label>
                                <div className="my-3">{precontractual?.contract_period} meses</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Tipología del comodato</label>
                                <div className="my-3">{precontractual?.loan_typology}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Base asegurable</label>
                                <div className="my-3">{precontractual?.lockable_base} %</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Aplica Proceso competitivo</label>
                                <div className="my-3">{precontractual?.competitive_process}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Fecha de Prediación</label>
                                <div className="my-3">{precontractual?.prediation_date}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Propiedad Horizontal</label>
                                <div className="my-3">{precontractual?.horizontal_property}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">¿resolución SSS202050083439?</label>
                                <div className="my-3">{precontractual?.resolution}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">¿Autoriza explotación económica?</label>
                                <div className="my-3">{precontractual?.economic_exploitation}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Servicios públicos por Aforo</label>
                                <div className="my-3">{precontractual?.public_service}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Tipo de negocio</label>
                                <div className="my-3">{precontractual?.business_type}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Destinación de bien Inmueble</label>
                                <div className="my-3">{precontractual?.destination_realestate}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Paz y Salvo de Rubros</label>
                                <div className="my-3">{precontractual?.peacesafe}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Eventos sociales</label>
                                <div className="my-3">{precontractual?.social_event}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-3">
                                <label htmlFor="">Población</label>
                                <div className="my-3">{precontractual?.population}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Sector Beneficiado</label>
                                <div className="my-3">{precontractual?.benefited_sector}</div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">Comuna Y Barrio</label>
                                <div className="my-3">{precontractual?.beneficiary_location_id}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-6 movimiento">
                                <label htmlFor="">Campo de acción</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {precontractual?.action_field}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 movimiento">
                                <label htmlFor="">Como contribuye la dependencia</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {precontractual?.dependence}
                                    </div>
                                </div>
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
                                <label htmlFor="">Actividades</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div style={{ width: '1000px' }}>
                                        {precontractual?.activities}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-6 movimiento">
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

export default DetailComodato
