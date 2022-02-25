import React, { FC, useContext } from 'react'
import { Collapse } from 'antd';
import ModalElectronicFiel from './ModalElectronicFiel';
import { LinkButton } from '../../../utils/ui/link';
import { download_document } from '../../../utils/components/DocumentsModal/services';
import { TemplateContext } from '../../../utils/components/template/template_context';

interface FormPros {
    documents?: any;
    real_estate_id?: number;

}

const CollapseElectronicFiel: FC<FormPros> = ({ documents, real_estate_id }) => {

    const { Panel } = Collapse;
    const context = useContext(TemplateContext);
    function callback(key) {
        console.log(key);
    }


    return (
        <>
            <Collapse key="collapse_1" onChange={callback} style={{ borderRadius: '7px', backgroundColor: '#fff' }} >
                <Panel header="Adquisición" key="panel_1" style={{ fontWeight: "bold" }} extra={
                    <ModalElectronicFiel
                        type={"5"}
                        real_estate_id={real_estate_id}
                    />
                }>
                    {documents?.realEstates?.length > 0 ? (
                        documents?.realEstates?.map(doc => {
                            return (
                                <>
                                    <div key={`adquisicion_${doc.id}`} className="row" style={{ borderRadius: '7px' }}>
                                        <div className="col-10">
                                            <span style={{ paddingLeft: `${context.device === "sm" ? '0px' : context.device === "md" ? "30px" : '50px' }`, fontWeight: "normal" }}>{doc.name}</span>
                                        </div>
                                        <div
                                            className=" col-2 justify-content-end"
                                            style={{ paddingLeft: `${context.device === "sm" ? '' : context.device === "md" ?  "30px" :  '50px' }` }}
                                        >
                                            {/* <Link

                                                to={``}
                                                name=""
                                                avatar={false}
                                                icon={
                                                    <i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-eye" aria-hidden="true" />
                                                }
                                            /> */}
                                            <LinkButton
                                                name=""
                                                avatar={false}
                                                onClick={() => {
                                                    download_document(doc.id, doc.name)
                                                }}
                                                icon={<i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-download" aria-hidden="true" />}
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                </>

                            );
                        }))
                        :
                        <span style={{ fontWeight: "normal", paddingLeft: `${context.device === "sm" ? '0px' : '30px'}` }}>No se han subido documentos en el módulo de Adquisición</span>
                    }
                </Panel>
            </Collapse>

            <Collapse key="collapse_2" onChange={callback} style={{ borderRadius: '7px', backgroundColor: '#fff', marginTop: '5px' }}>
                <Panel header={`${context.device === "sm" ? "Admin de inventario" : "Administración de inventario" }`} key="panel_2" style={{ fontWeight: "bold" }} extra={
                    <ModalElectronicFiel
                        type={"6"}
                        real_estate_id={real_estate_id}
                    />
                } >
                    {documents?.inventoryRecord?.length > 0 ? (
                        documents?.inventoryRecord?.map(doc => {
                            return (
                                <>
                                    <div key={`inventario_${doc.id}`} className="row" style={{ borderRadius: '7px' }}>
                                        <div className="col-10">
                                            <span style={{ paddingLeft: `${context.device === "sm" ? '0px' : context.device === "md" ? "30px" : '50px' }`, fontWeight: "normal" }}>{doc.name}</span>
                                        </div>
                                        <div
                                            className=" col-2 justify-content-end"
                                            style={{ paddingLeft: `${context.device === "sm" ? '' : context.device === "md" ?  "30px" :  '50px' }` }}
                                        >
                                            {/* <Link

                                                to={``}
                                                name=""
                                                avatar={false}
                                                icon={
                                                    <i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-eye" aria-hidden="true" />
                                                }
                                            /> */}
                                            <LinkButton
                                                name=""
                                                avatar={false}
                                                onClick={() => {
                                                    download_document(doc.id, doc.name)
                                                }}
                                                icon={<i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-download" aria-hidden="true" />}
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                </>

                            );
                        }))
                        :
                        <span style={{ fontWeight: "normal", paddingLeft: `${context.device === "sm" ? '0px' : '30px'}` }}>No se han subido documentos en el módulo de Administración de Inventario</span>
                    }
                </Panel>
            </Collapse>

            <Collapse key="collapse_3" onChange={callback} style={{ borderRadius: '7px', backgroundColor: '#fff', marginTop: '5px' }} >
                <Panel header="Asegurabilidad" key="panel_3" style={{ fontWeight: "bold" }} extra={
                    <ModalElectronicFiel
                        type={"11"}
                        real_estate_id={real_estate_id}
                    />
                }  >
                    {documents?.policies?.length > 0 ? (
                        documents?.policies?.map(doc => {
                            return (
                                <>
                                    <div key={`asegurabilidad_${doc.id}`} className="row" style={{ borderRadius: '7px' }}>
                                        <div className="col-10">
                                                <span style={{ paddingLeft: `${context.device === "sm" ? '0px' : context.device === "md" ? "30px" : '50px' }`, fontWeight: "normal" }}>{doc.name}</span>
                                        </div>
                                        <div
                                            className=" col-2 justify-content-end"
                                            style={{ paddingLeft: `${context.device === "sm" ? '' : context.device === "md" ?  "30px" :  '50px' }` }}
                                        >
                                            {/* <Link

                                                to={``}
                                                name=""
                                                avatar={false}
                                                icon={
                                                    <i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-eye" aria-hidden="true" />
                                                }
                                            /> */}
                                            <LinkButton
                                                name=""
                                                avatar={false}
                                                onClick={() => {
                                                    download_document(doc.id, doc.name)
                                                }}
                                                icon={<i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-download" aria-hidden="true" />}
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                </>

                            );
                        }))
                        :
                        <span style={{ fontWeight: "normal", paddingLeft: `${context.device === "sm" ? '0px' : '30px'}` }}>No se han subido documentos en el módulo de Asegurabilidad</span>
                    }
                </Panel>
            </Collapse>

            <Collapse key="collapse_4" onChange={callback} style={{ borderRadius: '7px', backgroundColor: '#fff', marginTop: '5px' }}>
                <Panel header="Inspección" key="panel_4" style={{ fontWeight: "bold" }} extra={
                    <ModalElectronicFiel
                        type={"8"}
                        real_estate_id={real_estate_id}
                    />
                }  >
                    {documents?.inspections?.length > 0 ? (
                        documents?.inspections?.map(doc => {
                            return (
                                <>
                                    <div key={`inspección_${doc.id}`} className="row" style={{ borderRadius: '7px' }}>
                                        <div className="col-10">
                                                <span style={{ paddingLeft: `${context.device === "sm" ? '0px' : context.device === "md" ? "30px" : '50px' }`, fontWeight: "normal" }}>{doc.name}</span>
                                        </div>
                                        <div
                                            className=" col-2 justify-content-end"
                                            style={{ paddingLeft: `${context.device === "sm" ? '' : context.device === "md" ?  "30px" :  '50px' }` }}
                                        >
                                            {/* <Link

                                                to={``}
                                                name=""
                                                avatar={false}
                                                icon={
                                                    <i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-eye" aria-hidden="true" />
                                                }
                                            /> */}
                                            <LinkButton
                                                name=""
                                                avatar={false}
                                                onClick={() => {
                                                    download_document(doc.id, doc.name)
                                                }}
                                                icon={<i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-download" aria-hidden="true" />}
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                </>

                            );
                        }))
                        :
                        <span style={{ fontWeight: "normal", paddingLeft: `${context.device === "sm" ? '0px' : '30px'}` }}>No se han subido documentos en el módulo de Inspección</span>
                    }
                </Panel>
            </Collapse>

            <Collapse key="collapse_5" onChange={callback} style={{ borderRadius: '7px', backgroundColor: '#fff', marginTop: '5px' }}>
                <Panel header="Disposición" key="panel_5" style={{ fontWeight: "bold" }} extra={
                    <ModalElectronicFiel
                        type={"10"}
                        real_estate_id={real_estate_id}
                    />
                }  >
                    {documents?.dispositions?.length > 0 ? (
                        documents?.dispositions?.map(doc => {
                            return (
                                <>
                                    <div key={`disposicion_${doc.id}`} className="row" style={{ borderRadius: '7px' }}>
                                        <div className="col-10">
                                            <span style={{ paddingLeft: `${context.device === "sm" ? '0px' : context.device === "md" ? "30px" : '50px' }`, fontWeight: "normal" }}>{doc.name}</span>
                                        </div>
                                        <div
                                            className=" col-2 justify-content-end"
                                            style={{ paddingLeft: `${context.device === "sm" ? '' : context.device === "md" ?  "30px" :  '50px' }` }}
                                        >
                                            {/* <Link

                                                to={``}
                                                name=""
                                                avatar={false}
                                                icon={
                                                    <i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-eye" aria-hidden="true" />
                                                }
                                            /> */}
                                            <LinkButton
                                                name=""
                                                avatar={false}
                                                onClick={() => {
                                                    download_document(doc.id, doc.name)
                                                }}
                                                icon={<i style={{ marginRight: '5px', color: '#5D5D5D' }} className="fa fa-download" aria-hidden="true" />}
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                </>

                            );
                        }))
                        :
                        <span style={{ fontWeight: "normal", paddingLeft: `${context.device === "sm" ? '0px' : '30px'}` }}>No se han subido documentos en el módulo de Disposición</span>
                    }
                </Panel>
            </Collapse>

            {/* <div className="row justify-content-end">
                <div className="col text-end">
                    <button type="submit" className="btn btn-outline-primary" style={{ marginTop: '200px' }} >
                        Nueva Carpeta
                    </button>
                </div>
            </div> */}
        </>

    )
}

export default CollapseElectronicFiel
