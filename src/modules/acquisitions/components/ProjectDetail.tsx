import React, { FC } from 'react';
import { formatDate } from '../../../utils';

interface IUserFormPros {
    project: any;
}
const ProjectDetail: FC<IUserFormPros> = ({ project }) => {
    return (
        <div className="col-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Información del proyecto
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Código del proyecto</label>
                                <div className="my-3">{project?.id || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Nombre del proyecto</label>
                                <div className="my-3">{project?.name || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Dependencia o secretaría</label>
                                <div className="my-3">{project?.dependency || "-"}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Subsecretaría o subdirección</label>
                                <div className="my-3">{project?.subdependency || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Centro gestor</label>
                                <div className="my-3">{project?.management_center || '-'}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Centro de costos</label>
                                <div className="my-3">{project?.cost_center || '-'}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="">Valor presupuestal</label>
                                <div className="my-3">{project?.budget_value || '-'}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor=""> Fecha de creación</label>
                                <div className="my-3">{formatDate(project?.audit_trail?.created_on) || '-'}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="">Creado por</label>
                                <div className="my-3">{project?.audit_trail?.created_by || '-'}</div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 movimiento">
                                <label htmlFor="">Descripción</label>
                                <div className="my-3" style={{ height: '60px', overflowX: 'auto' }}>
                                    <div
                                        style={{
                                            width: project?.description ? project?.description.length * 13 : '1000px',
                                        }}
                                    >
                                        {project?.description || "-"}
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

export default ProjectDetail;
