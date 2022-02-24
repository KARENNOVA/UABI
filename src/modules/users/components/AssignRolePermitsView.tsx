import React, { FC, useContext } from 'react';
import { chunk } from 'lodash';
import { TemplateContext } from '../../../utils/components/template/template_context';

interface IUserFormPros {
    roles: any[];
    permits: any[];
}

const AssignRolePermitsView: FC<IUserFormPros> = ({ roles, permits }) => {
    const context = useContext(TemplateContext);
    const has_permits = permits?.length > 0;
    const valores = chunk(permits, 10);
    const has_roles = roles?.length > 0;
    const valoresR = chunk(roles, 4);
    return (
        <div className="col-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Roles y permisos del usuario
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <label htmlFor="">Roles</label>
                            {has_roles && (
                                <div className="row">
                                    {valoresR.map((vals: any[], i) => {
                                        return (
                                            <div className={`col-12 col-md-${context.menu_collapsed ? 6 : 12 } col-lg-3`} key={`col-${i}`}>
                                                <div className="my-3" key={i}>
                                                    <ul>
                                                        {vals?.map((v: any, j) => (
                                                            <li key={`${i}-${j}`}>{v.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {!has_roles && (
                                <div className="row">
                                    <div className="col-12">Sin roles asignados</div>
                                </div>
                            )}
                            {/* <div className="col-12">
                                <label htmlFor="">Roles</label>
                                <div className="my3">
                                    {roles && roles.length > 0 && (
                                        <ul>
                                            {roles.map((rol, i) => (
                                                <li key={i}>{rol.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {roles && roles.length === 0 && <span>Sin Roles Asignados</span>}
                                </div>
                            </div> */}
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <label htmlFor="">Permisos</label>
                            {has_permits && (
                                <div className="row">
                                    {valores.map((vals: any[], i) => {
                                        return (
                                            <div className={`col-12 col-md-${context.menu_collapsed ? 6 : 12 } col-lg-3`} key={`colp-${i}`}>
                                                <div className="my-3" key={i}>
                                                    <ul>
                                                        {vals?.map((v: any, j) => (
                                                            <li key={`${i}-${j}`}>{v.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {!has_permits && (
                                <div className="row">
                                    <div className="col-12">Sin permisos asignados</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignRolePermitsView;
