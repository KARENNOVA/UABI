import React, { FC } from 'react'

interface FormPros {
    dispositionType?: string;
    title: string;
    person?: any;
}

const ViewPerson: FC<FormPros> = ({ dispositionType, title, person }) => {
    return (
        <div className="col-3-12">
            <div className="content_box_table">
                <div
                    className="title"
                    style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                >
                    {title}
                    {/* {dispositionType === "Comodato" && "Informacióm del Comodatario"}
                    {dispositionType === "arrendamiento" && "Informacióm del Arrendatario"} */}
                </div>
                <div className="table_content" style={{ margin: 7 }}>
                    <div className="detailForm" style={{ width: '100%' }}>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            <div className="col-6">
                                <label htmlFor="">Nombre</label>
                                <div className="my-3">
                                    {person?.document_type !== "NIT" ? `${person?.first_name ?? ""} ${person?.last_name ?? ""} ${person?.first_surname ?? ""} ${person?.last_surname ?? ""} ` : person?.company_name}
                                </div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Tipo de documento</label>
                                <div className="my-3">{person?.document_type}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Número de documento</label>
                                <div className="my-3">{person?.document_number}</div>
                            </div>
                        </div>
                        <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                            {person?.document_type !== "NIT" &&
                                <div className="col-3">
                                    <label htmlFor="">Género</label>
                                    <div className="my-3">{person?.gender === "F" ? "Femenino" : person?.gender === "M" ? "Masculino" : "otro"}</div>
                                </div>

                            }
                            <div className="col-3">
                                <label htmlFor="">Dirección</label>
                                <div className="my-3">{person?.location?.address}</div>
                            </div>
                            <div className={person?.document_type !== "NIT" ? `col-3` : "col-6"}>
                                <label htmlFor="">Correo Electronico</label>
                                <div className="my-3">{person?.email}</div>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Teléfono</label>
                                <div className="my-3">{person?.phone_number}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPerson
