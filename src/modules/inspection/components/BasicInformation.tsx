import React, { FC, useEffect, useRef } from 'react';
import { Card } from '../../../utils/ui';
import { Field, Form, Formik } from 'formik';
import ErrorMessage from '../../../utils/ui/error_messge';
import { ModalNotificar } from '../../disposition/components/ModalNotificar';
import Map from '../../../utils/components/template/map';
import writtenNumber from 'written-number';
import {NewInspection} from "../custom_types";
import {PersonalInformationForm} from "../../../utils/ui/PersonaM";

interface BasicInformationProps {
    obs: string
    inspection: NewInspection;
    real_estate: any;
    disabled?: boolean;
    innerRef: any;
    onSubmit: (values) => void;
}
const BasicInformation: FC<BasicInformationProps> = ({
    obs,
    inspection,
    disabled,
    innerRef,
    onSubmit,
    real_estate,
}) => {
    return (
        <div className="container-fluid">
            <div className="col-12">
                <div className="content_box_table">
                    <div
                        className="title"
                        style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                    >
                        Información básica del bien inmueble
                    </div>
                    <div className="table_content" style={{ margin: 7 }}>
                        <div className="detailForm" style={{ width: '100%' }}>
                            <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Codigo CBML</label>
                                    <div className="my-3">{real_estate?.address?.cbmls?.uabi ?? '-'}</div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Título de adquisición</label>
                                    <div className="my-3">
                                        {real_estate?.acquisitions?.reduce(
                                            (res, acq) => `${res ? `${res},` : ''} ${acq.acquisition_type}`,
                                            ''
                                        ) ?? '-'}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Fecha del título de adquisición</label>
                                    <div className="my-3">
                                        {real_estate?.acquisitions?.reduce(
                                            (res, acq) => `${res ? `${res},` : ''} ${acq.acquisition_date}`,
                                            ''
                                        ) ?? '-'}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Tipo de entidad</label>
                                    <div className="my-3">
                                        {real_estate?.acquisitions?.reduce(
                                            (res, acq) => `${res ? `${res},` : ''} ${acq.entity_type}`,
                                            ''
                                        ) ?? '-'}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">No entidad que emite el títulomento</label>
                                    <div className="my-3">
                                        {real_estate?.acquisitions?.reduce(
                                            (res, acq) => `${res ? `${res},` : ''} ${acq.entity_number}`,
                                            ''
                                        ) ?? '-'}
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Avalúo del BI</label>
                                    <div className="my-3">{writtenNumber(real_estate?.patrimonial_value, { lang: 'es' }) ?? '-'}</div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Dirección del BI</label>
                                    <div className="my-3">{real_estate?.address?.address ?? '-'}</div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Tipo de inmueble</label>
                                    <div className="my-3">{real_estate?.active_type?.join(', ') ?? '-'}</div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Categoría del BI</label>
                                    <div className="my-3">{real_estate?.destination_type ?? '-'}</div>
                                </div>
                                <div className="col-12 col-lg-2 col-md-4">
                                    <label htmlFor="">Nombre del BI</label>
                                    <div className="my-3">{real_estate?.name ?? '-'}</div>
                                </div>
                            </div>
                            {real_estate?.contrat &&
                                <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                    <div className="col-12 col-lg-2 col-md-4">
                                        <label htmlFor="">Número de contrato </label>
                                        <div className="my-3">{real_estate?.contrat ?? '-'}</div>
                                    </div>
                                    <div className="col-12 col-lg-2 col-md-4">
                                        <label htmlFor="">Vigencia del contrato</label>
                                        <div className="my-3">{real_estate?.contract?.number ?? '-'}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Card
                actions={[
                    <div className="d-flex justify-content-end pe-4 ps-4">
                        <ModalNotificar />
                    </div>,
                ]}
            >

                <Formik
                    innerRef={innerRef}
                    enableReinitialize
                    onSubmit={(values, form) => {
                        onSubmit(values);
                        form.setSubmitting(false);
                    }}
                    initialValues={{
                        observations: obs || inspection?.basic_information.differences || '',
                    }}
                >
                    {() => {
                        return (
                            <Form>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="contractual_id" className="form-label">
                                            Diferencias entre el Sistema y la Realidad
                                        </label>
                                        <Field
                                            as="textarea"
                                            className="form-control"
                                            id="contractual_id"
                                            aria-describedby="emailHelp"
                                            placeholder="Diferencias"
                                            name="observations"
                                            disabled={disabled}
                                            autoComplete="off"
                                            maxLength={250}
                                        />
                                        <ErrorMessage name="observations" withCount max={250} />
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Card>

            <Card>
                <Map />
            </Card>
        </div>
    );
};

export default BasicInformation;
