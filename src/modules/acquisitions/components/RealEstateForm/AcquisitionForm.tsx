import React, { FC } from 'react';

import { AdquisitionsItf } from '../../../../utils/interfaces';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../utils/ui/error_messge';
import LocationModal from '../../../../utils/components/Location/LocationModal';
import * as Yup from 'yup';
import TooltipField from '../../../../utils/ui/tooltip_field';
import PersonaM from '../../../../utils/ui/PersonaM';
import moment from 'moment';

interface AcquisitionsFromProps {
    innerRef?: any;
    type?: 'view' | 'edit' | 'create';
    disabled?: boolean;
    acquisition?: AdquisitionsItf;
    active_type?: string[];
    onChange: (values, count) => Promise<any>;
}

const AcquisitionsFrom: FC<AcquisitionsFromProps> = ({ disabled, acquisition, onChange, innerRef }) => {
    const initial_values = {
        acquisition_type: '',
        area: '',
        title_type: '',
        act_number: '',
        act_value: '',
        recognition_value: '',
        acquired_percentage: '',
        origin: '',
        entity_type: '',
        entity_number: '',
        city: '',
        acquisition_date: '',
        real_estate_id: '',
        ...acquisition,
    };

    const schema = Yup.object().shape({
        acquisition_type: Yup.string().required('Campo obligatorio'),
        area: Yup.number().required('Campo obligatorio'),
        title_type: Yup.string().required('Campo obligatorio'),
        act_number: Yup.string().required('Campo obligatorio'),
        act_value: Yup.number()
            .required('Campo obligatorio')
            .min(0, 'El minimo es 0')
            .max(9999999999, 'El maximo 10 es caracteres'),
        recognition_value: Yup.number()
            .min(0, 'El minimo es 0')
            .max(9999999999, 'El maximo 10 es caracteres'),
        acquired_percentage: Yup.number().required('Campo obligatorio').min(0, 'El minimo es 0').max(100, 'El maximo es 100'),
        origin: Yup.object().required('Campo obligatorio'),
        entity_type: Yup.string().required('Campo obligatorio'),
        entity_number: Yup.string().required('Campo obligatorio'),
        acquisition_date: Yup.date().required('Campo obligatorio'),
        city: Yup.string().required('Campo obligatorio'),
    });

    const submit = (values, form) => {
        form.setSubmitting(true);
        onChange(values, form)
            .then(() => {
                form.setSubmitting(false);
                form.resetForm();
            })
            .catch(() => {
                form.setSubmitting(false);
            });
    };

    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initial_values}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ setFieldValue, handleChange }) => {
                const number_validate = (limit?: number) => (e) => {
                    e.preventDefault();
                    const regex = new RegExp(`^[+]?\\d${limit ? `{0,${limit}}` : '*'}$`);
                    if (regex.test(e.target.value.toString())) {
                        handleChange(e);
                    }
                };

                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="acquisition_type_id" className="form-label">
                                    Tipo de Adquisición <span className="text-danger">*</span>
                                </label>
                                <Field
                                    as="select"
                                    className="form-select"
                                    name="acquisition_type"
                                    id="acquisition_type_id"
                                >
                                    <option value="" disabled hidden>
                                        -- Seleccione Tipo de Adquisición --
                                    </option>
                                    <option value="Compraventa">Compraventa</option>
                                    <option value="Donación">Donación</option>
                                    <option value="Expropiación">Expropiación</option>
                                    <option value="Permuta">Permuta</option>
                                    <option value="Cesión a título gratuito">Cesión a título gratuito</option>
                                    <option value="Dación en pago">Dación en pago</option>
                                    <option value="Obigaciones Urbanísticas">Obigaciones Urbanísticas</option>
                                </Field>
                                <ErrorMessage name="acquisition_type" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="title_type_id" className="form-label">
                                    Tipo de Título <span className="text-danger">*</span>
                                </label>
                                <Field as="select" className="form-select" name="title_type" id="title_type_id">
                                    <option value="">-- Seleccione Tipo de Título --</option>
                                    <option value="Escritura">Escritura</option>
                                    <option value="Certificado tradición y libertad">
                                        Certificado tradición y libertad
                                    </option>
                                    <option value="Acta de liquidación">Acta de liquidación</option>
                                    <option value="Resolucion">Resolucion</option>
                                </Field>
                                <ErrorMessage name="title_type" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="act_number_id" className="form-label">
                                    N° acto administrativo <span className="text-danger">*</span>
                                </label>
                                <Field type="text" className="form-control" id="act_number_id" name="act_number" />
                                <ErrorMessage name="act_number" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="origin_id" className="form-label">
                                    Procedencia <span className="text-danger">*</span>
                                </label>
                                <TooltipField text="Lorem impsu texto descriptivo" />
                                <Field component={PersonaM} id="origin_id" name="origin" withNit={true} />
                                <ErrorMessage name="origin" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="entity_type_id" className="form-label">
                                    Tipo de Entidad <span className="text-danger">*</span>
                                </label>
                                <Field as="select" className="form-select" id="entity_type_id" name="entity_type">
                                    <option value="">-- Seleccione Tipo de Entidad --</option>
                                    <option value="Notaría">Notaría</option>
                                </Field>
                                <ErrorMessage name="entity_type" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="entity_number_id" className="form-label">
                                    N° de entidad <span className="text-danger">*</span>
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="entity_number_id"
                                    aria-describedby="entity_number"
                                    name="entity_number"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[0-9]{0,10}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="entity_number" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="acquired_percentage_id" className="form-label">
                                    Porcentaje Adquirido <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <Field
                                        type="number"
                                        className="form-control border-end-0"
                                        id="acquired_percentage_id"
                                        name="acquired_percentage"
                                        min={0}
                                        max={999}
                                        onChange={number_validate(3)}
                                    />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white border-start-0">%</span>
                                    </div>
                                </div>
                                <ErrorMessage name="acquired_percentage" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="area_id" className="form-label">
                                    Área <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <Field
                                        type="number"
                                        className="form-control border-end-0"
                                        id="area_id"
                                        name="area"
                                        min={0}
                                        onChange={number_validate(10)}
                                    />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white border-start-0">
                                            m<sup>2</sup>
                                        </span>
                                    </div>
                                </div>
                                <ErrorMessage name="area" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="acquisition_value_id" className="form-label">
                                    Valor de adquisición <span className="text-danger">*</span>
                                </label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="acquisition_value_id"
                                    name="act_value"
                                    // min={0}
                                    // max={9999999999}
                                    onChange={number_validate(10)}
                                />
                                <ErrorMessage name="act_value" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="acquisition_value_id" className="form-label">
                                    Valor de Reconocimiento
                                </label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="acquisition_value_id"
                                    name="recognition_value"
                                    onChange={number_validate(10)}
                                />
                                <ErrorMessage name="recognition_value" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="vigency_start" className="form-label mt-3 mt-lg-0">
                                    Fecha de Adquisición <span className="text-danger">*</span>
                                </label>
                                <Field
                                    type="date"
                                    id="vigency_start"
                                    name="acquisition_date"
                                    className="form-control"
                                    max={moment(new Date()).format('YYYY-MM-DD')}
                                    disabled={disabled}
                                />
                                <ErrorMessage name="acquisition_date" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <label htmlFor="address_id" className="form-label">
                                    Ciudad <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <Field name="city" id="address_id" type="text" className="form-control" disabled />
                                    <div className="input-group-prepend">
                                        <LocationModal
                                            disabled={disabled}
                                            onSave={async (_values) => {
                                                setFieldValue('city', _values.city_name, false);
                                            }}
                                        />
                                    </div>
                                </div>
                                <ErrorMessage name="city" />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

AcquisitionsFrom.defaultProps = {};

export default AcquisitionsFrom;
