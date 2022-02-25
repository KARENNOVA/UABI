import React, { FC } from 'react';
import { formatDate } from '../../../utils';
import { Broker } from '../redux/service';

interface InsuranceBrokerDetailProps {
    broker: Broker;
    location?: any;
}
const InsuranceBrokerDetail: FC<InsuranceBrokerDetailProps> = ({ broker, location }) => {
    return (
        <div className="col-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Información del corredor de seguros
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Código</label>
                                <div className="my-3">{broker?.id}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Nombre del corredor de seguros</label>
                                <div className="my-3">{broker?.name || '-'}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">NIT</label>
                                <div className="my-3">{broker?.nit || '-'}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Teléfono</label>
                                <div className="my-3">{broker?.phone || '-'}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Departamento</label>
                                <div className="my-3">{location?.location?.state ?? ''}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Ciudad</label>
                                <div className="my-3">{location?.location?.city ?? ''}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Dirección</label>
                                <div className="my-3">{location?.address ?? ''}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Nombre de contacto</label>
                                <div className="my-3">{broker?.contact_information?.name || '-'}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Correo electrónico de contacto</label>
                                <div className="my-3">{broker?.contact_information?.email || '-'}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Teléfono de contacto</label>
                                <div className="my-3">{broker?.contact_information?.phone || '-'}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor=""> Fecha de creación</label>
                                <div className="my-3">{formatDate(broker?.audit_trail?.created_on) || '-'}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Creado por</label>
                                <div className="my-3">{broker?.audit_trail?.created_by || '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceBrokerDetail;
