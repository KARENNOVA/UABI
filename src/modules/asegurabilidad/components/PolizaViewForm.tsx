import moment from 'moment';
import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../redux';

interface IpolizaFormPros {
    policy_id: string;

}
export const PolizaViewForm: FC<IpolizaFormPros> = ({ policy_id }) => {
    //const companies = poliza?.insurance_companies.map((policy) => policy.name).join(', ');
    const dispatch = useDispatch();
    const poliza: any = useSelector((store: any) => store.insurability.policy.value);
    useEffect(() => {
        dispatch(actions.getPolicy(policy_id));
    }, [policy_id])
    const tmpDateStart = new Date(parseInt(poliza?.vigency_start));
    const newDateStart = moment(tmpDateStart).format('MM/DD/YYYY');
    const tmpDateEnd = new Date(parseInt(poliza?.vigency_end));
    const newDateEnd = moment(tmpDateEnd).format('MM/DD/YYYY');

    const companies = poliza?.insurance_companies?.map( p => {
        const company = `${p.name} - ${p.percentage_insured}%`
        return company
    }).join(', ');


    return (
        <div className="col-12" id="poliza">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    Información de la póliza
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Tipo de póliza</label>
                                <div className="my-3">{poliza?.policy_type || "-"}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Fecha de inicio</label>
                                <div className="my-3">{newDateStart === "Fecha inválida" ? "-" : newDateStart}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Fecha de finalización</label>
                                <div className="my-3">{newDateEnd === "Fecha inválida" ? "-" : newDateEnd}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Corredor de seguros</label>
                                <div className="my-3">{poliza?.insurance_broker?.name || "-"}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Valor de póliza</label>
                                <div className="my-3">{poliza?.insurance_value || "-"}</div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="">Tipo de aseguramiento</label>
                                <div className="my-3">{poliza?.type_assurance || "-"}</div>
                            </div>

                            <div className="col-12 col-lg-6 col-md-6">
                                <label htmlFor="">Compañías aseguradoras</label>
                                <div className="my-3">{companies || "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
