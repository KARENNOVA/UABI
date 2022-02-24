import React, { FC } from 'react';
import { chunk } from 'lodash';

interface IUserFormPros {
    role: any;
}
const RoleViewForm: FC<IUserFormPros> = ({ role }) => {
    // console.log(role)
    // let contar = 0;
    const has_permits = role?.permits?.length > 0;
    const valores = chunk(role?.permits, 10);

    // console.log(valores)

    return (
        <div className="col-3-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Información del rol
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12">
                                <label htmlFor="">Rol</label>
                                <div className="my-3">{role?.name}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <label htmlFor="">Permisos</label>
                            {has_permits && (
                                <div className="row">
                                    {valores.map((vals: any[], i) => {
                                        return (
                                            <div className="col-3">
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
                                    <div className="col-12">Sin permisos</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleViewForm;
