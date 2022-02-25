import React, { FC } from 'react';
import { formatDate } from '../../../utils';
import { Company } from '../redux/service/company';

interface InsuranceCompanyDetailProps {
    company: Company;
    location: any
}
const InsuranceCompanyDetail: FC<InsuranceCompanyDetailProps> = ({ company, location }) => {
    return (
        <div className="col-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Información de la compañía
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Código</label>
                                <div className="my-3">{company?.id}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Nombre de la compañía</label>
                                <div className="my-3">{company?.name || '-'}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">NIT</label>
                                <div className="my-3">{company?.nit || '-'}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Teléfono</label>
                                <div className="my-3">{company?.phone || '-'}</div>
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
                                <label htmlFor=""> Fecha de creación</label>
                                <div className="my-3">{formatDate(company?.audit_trail?.created_on) || '-'}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6 col-md-6">
                                <label htmlFor="">Creado por</label>
                                <div className="my-3">{company?.audit_trail?.created_by || '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsuranceCompanyDetail;
