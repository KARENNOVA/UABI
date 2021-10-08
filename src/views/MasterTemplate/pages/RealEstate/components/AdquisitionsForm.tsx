import React, { FC, Fragment, useState } from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

interface AdquisitionsItf {
    id?: number;
    acquisition_type?: string;
    active_type?: string;
    title_type?: string;
    act_number?: string;
    acquisition_value?: number;
    area?: number;
    acquired_percentage?: number;
    seller?: string;
    entity_type?: string;
    entity_number?: string;
    address?: string;
    //--------
    id_document_acquisition_type?: number;
    real_estate_id?: number;
    id_document_matricula?: number;
    status?: number;
}

const AdquisitionsFrom: FC<any> = ({ type }) => {
    const inicial_values: AdquisitionsItf = {
        title_type: "None",
        acquisition_type: "1",
        active_type: "1",
        seller: "1",
        entity_type: "1",
        acquired_percentage: 0,
        acquisition_value: 0,
        act_number: "",
        address: "",
        area: 0,
        entity_number: "",
    }
    const [adquisitions, set_adquisitions] = useState<AdquisitionsItf[]>([]);
    console.log(adquisitions);
    const [adquisition, set_adquisition] = useState<AdquisitionsItf>(inicial_values)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        // console.log("handleChange", { name, value });
        const data = {
            ...adquisition,
            [name]: value,
        }
        set_adquisition(data);
    };

    const addAdquisition = (new_adquisition: AdquisitionsItf) => {
        set_adquisitions([
            ...adquisitions,
            new_adquisition
        ])
    }

    const clearAdquisition = () => {
        set_adquisition(inicial_values)
    }


    return <div
        className='row py-3 my-3'
        style={{
            backgroundColor: '#f7f7f7',
            borderRadius: 15,
            border: '1px solid',
        }}
    >
        <h5>Información de Adquisición</h5>


        {type !== "view" && <div className="col-6">
            <div className="row">
                <div className='col-6'>
                    <label htmlFor='form-select' className='form-label'>
                        Tipo de Adquisición
                    </label>
                    <select
                        className='form-select'
                        aria-label='Default select example'
                        name='acquisition_type'
                        onChange={handleChange}
                        value={adquisition.acquisition_type}
                    >
                        <option value='1'>
                            Compraventa
                        </option>
                        <option value='2'>Donación</option>
                        <option value='3'>Expropiación</option>
                        <option value='4'>Permuta</option>
                        <option value='5'>Cesión a título gratuito</option>
                        <option value='6'>Dación en pago</option>
                        <option value='7'>Obigaciones Urbanísticas</option>
                    </select>
                </div>
                <div className='col-6'>
                    <label htmlFor='form-select' className='form-label'>
                        Tipo de activo
                    </label>
                    <select
                        className='form-select'
                        aria-label='Default select example'
                        name="active_type"
                        onChange={handleChange}
                        value={adquisition.active_type}
                    >
                        <option value='1'>
                            Lote
                        </option>
                        <option value='2'>Construccion</option>
                        <option value='3'>Mejora</option>
                        <option value='4'>Construcción para demoler</option>
                    </select>
                </div>
                <div className='col-6'>
                    <label htmlFor='form-select' className='form-label'>
                        Tipo de Título
                    </label>
                    <select
                        className='form-select'
                        aria-label='Default select example'
                        name="title_type"
                        onChange={handleChange}
                        value={adquisition.title_type}
                    >
                        <option value="None">
                            --
                        </option>
                        <option value='Acta'>Acta</option>
                        <option value='Mejora'>Mejora</option>
                        <option value='Construcción'>Construcción para demoler</option>
                    </select>
                </div>
                <div className='col-6'>
                    {adquisition.title_type !== "None" && <div className='mb-3'>
                        <label htmlFor='formFile' className='form-label'>
                            Documento de {adquisition.title_type}
                        </label>
                        <input
                            className='form-control'
                            type='file'
                            id='formFile'
                        />
                        {/*<div id='emailHelp' className='form-text'>*/}
                        {/*    Escritura.pdf*/}
                        {/*</div>*/}
                    </div>}
                </div>
                <div className='col-6'>
                    <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                    >
                        No Acto administrativo
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='act_number'
                        aria-describedby='act_number'
                        name='act_number'
                        onChange={handleChange}
                        value={adquisition.act_number || ""}
                    />
                </div>
                <div className='col-6'>
                    <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                    >
                        Valor de adquisición
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='acquisition_value'
                        aria-describedby='acquisition_value'
                        name='acquisition_value'
                        onChange={handleChange}
                        value={adquisition.acquisition_value || ""}
                    />
                </div>
                <div className='col-6'>
                    <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                    >
                        Area Total (m2)
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='area'
                        aria-describedby='area'
                        name="area"
                        onChange={handleChange}
                        value={adquisition.area || ""}
                    />
                </div>
                <div className='col-6'>
                    <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                    >
                        Porcentaje Adquirido
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='acquired_percentage'
                        aria-describedby='acquired_percentage'
                        name='acquired_percentage'
                        onChange={handleChange}
                        value={adquisition.acquired_percentage || ""}
                    />
                    <div id='emailHelp' className='form-text'></div>
                </div>
                <div className='col-6'>
                    <label htmlFor='form-select' className='form-label'>
                        Vendedor
                    </label>
                    <select
                        className='form-select'
                        aria-label='seller'
                        id='seller'
                        name='seller'
                        onChange={handleChange}
                        value={adquisition.seller}
                    >
                        <option value='1'>
                            Alexander
                        </option>
                        <option value='2'>Sergio</option>
                        <option value='3'>Ximena</option>
                    </select>
                </div>
                {/* <div className='col-3'>
            <label htmlFor='form-select' className='form-label'>
                Comprador
            </label>
            <select
                className='form-select'
                aria-label='Default select example'
            >
                <option value='1' selected>
                    Alexander
                </option>
                <option value='2'>Sergio</option>
                <option value='3'>Ximena</option>
            </select>
        </div> */}

                <div className='col-6'>
                    <label htmlFor='form-select' className='form-label'>
                        Tipo de Entidad
                    </label>
                    <select
                        className='form-select'
                        aria-label='entity_type'
                        id='entity_type'
                        name='entity_type'
                        onChange={handleChange}
                        value={adquisition.entity_type}
                    >
                        <option value='1'>
                            Notaría
                        </option>
                        <option value='2'>Sergio</option>
                        <option value='3'>Ximena</option>
                    </select>
                </div>
                <div className='col-6'>
                    <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                    >
                        No. Entidad
                    </label>
                    <input
                        type='number'
                        className='form-control'
                        id='entity_number'
                        aria-describedby='entity_number'
                        name='entity_number'
                        onChange={handleChange}
                        value={adquisition.entity_number || ""}
                    />
                    <div id='emailHelp' className='form-text'></div>
                </div>
                <div className='col-6'>
                    <label
                        htmlFor='exampleInputEmail1'
                        className='form-label'
                    >
                        Dirección
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='address'
                        name='address'
                        onChange={handleChange}
                        placeholder='Pop Up - Departamento y Municipio'
                    />
                </div>
                <div className='col-9' />
                <div className='col-3'>
                    <button type='button' className='btn btn-primary mr-3' onClick={() => {
                        addAdquisition(adquisition);
                        clearAdquisition();
                    }}>
                        Agregar Adquisición
                    </button>
                </div>
            </div>

        </div>}
        <div className={`col-${type !== "view" ? 6 : 12}`}>
            <div className="row">
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Tipo de Adquisición</Table.HeaderCell>
                            <Table.HeaderCell>No Acto administrativo</Table.HeaderCell>
                            <Table.HeaderCell>Valor de adquisición</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {adquisitions.map((row) => {
                            return <Table.Row>
                                <Table.Cell>{row.acquisition_type}</Table.Cell>
                                <Table.Cell>{row.act_number}</Table.Cell>
                                <Table.Cell>{row.acquisition_value}</Table.Cell>
                                {type === "view" && <Fragment>
                                    <Table.Cell>{row.title_type}</Table.Cell>
                                    <Table.Cell>{row.active_type}</Table.Cell>
                                    <Table.Cell>{row.seller}</Table.Cell>
                                    <Table.Cell>{row.entity_type}</Table.Cell>
                                    <Table.Cell>{row.acquired_percentage}</Table.Cell>
                                    <Table.Cell>{row.address}</Table.Cell>
                                    <Table.Cell>{row.area}</Table.Cell>
                                    <Table.Cell>{row.entity_number}</Table.Cell>
                                </Fragment>}
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </div>
        </div>



    </div>
}

export default AdquisitionsFrom;

