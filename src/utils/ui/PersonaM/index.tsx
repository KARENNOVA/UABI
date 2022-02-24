import React, { FC, useState, useRef, Fragment } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Field, Formik, Form, FieldProps } from 'formik';
import ErrorMessage from '../error_messge';
import * as Yup from 'yup';
import { getPersonalInformation, newPersonalInformation, updatePersonalInformation } from './service';
import LocationModal from '../../components/Location/LocationModal';
import { compute_persona_name } from '../../index';

interface PersonaModalProps {
    type: 'create' | 'edit';
    modal_name?: string;
    disabled?: boolean;
    btn_label?: any;
    onChange: (data, i) => Promise<any>;
    persona?: any;
    withNit: boolean;
    disposition: boolean;
}

const PersonaModal: FC<PersonaModalProps> = ({
    modal_name,
    disabled,
    btn_label,
    onChange,
    persona,
    type,
    withNit,
    disposition,
}) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const form_ref = useRef<any>();
    const title = modal_name ? modal_name : 'Datos básicos de la Persona ';
    const close = () => {
        set_is_visible(false);
    };

    const open = () => {
        !disabled && set_is_visible(true);
    };

    return (
        <>
            <div className={['input-group'].join(' ')}>
                <input
                    disabled
                    type="text"
                    className="form-control"
                    value={
                        persona
                            ? persona.documentType === 'NIT'
                                ? persona.company_name
                                : compute_persona_name(persona)
                            : ''
                    }
                />
                <span className="input-group-text" onClick={open}>
                    <i className="fa fa-user"></i>
                </span>
            </div>
            <Modal
                title={title}
                centered
                visible={is_visible}
                width={1000}
                onCancel={close}
                footer={[
                    <button
                        key={1}
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={close}
                        disabled={disabled}
                    >
                        Cancelar
                    </button>,
                    <button
                        key={2}
                        className="btn btn-primary ms-2"
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                            form_ref.current.submitForm();
                        }}
                    >
                        Guardar
                    </button>,
                ]}
            >
                <PersonalInformationForm
                    persona={persona}
                    form_ref={form_ref}
                    disabled={disabled}
                    disposition={disposition}
                    withNit={withNit}
                    onChange={(values, form) => {
                        return onChange(values, form).then(() => {
                            form.resetForm();
                            close();
                        });
                    }}
                />
            </Modal>
        </>
    );
};

export const PersonalInformationForm = ({
    persona,
    form_ref,
    disabled,
    onChange,
    withNit = false,
    disposition = false,
}) => {
    const initial_values = {
        id: '',
        documentType: '',
        documentNumber: '',
        names: { firstName: '', lastName: '' },
        surnames: { firstSurname: '', lastSurname: '' },
        company_name: '',
        email: '',
        phoneNumber: '',
        phoneNumber_ext: '',
        gender: '',
        post: '',
        location_id: '',
        ...persona,
    };

    console.log('personaM inicial', initial_values)

    const schema = Yup.object().shape({
        documentType: Yup.string().required('obligatorio'),
        documentNumber: Yup.string().required('obligatorio'),
        company_name: Yup.string().when('documentType', {
            is: 'NIT',
            then: Yup.string().required('obligatorio'),
        }),
        names: Yup.object({
            firstName: Yup.string(),
        }).when('documentType', {
            is: 'NIT',
            otherwise: Yup.object({
                firstName: Yup.string().required('obligatorio'),
            }),
        }),
        surnames: Yup.object({
            firstSurname: Yup.string(),
        }).when('documentType', {
            is: 'NIT',
            otherwise: Yup.object({
                firstSurname: Yup.string().required('obligatorio'),
            }),
        }),
        email: Yup.string().email().required('obligatorio'),
        phoneNumber: Yup.number()
            .required('Campo obligatorio')
            .min(999999, 'El minimo es 7 caracteres')
            .max(9999999999, 'El maximo 10 es caracteres'),
        gender: Yup.string().when('documentType', {
            is: 'NIT',
            otherwise: Yup.string().required('obligatorio'),
        }),
    });
    return (
        <Formik
            validationSchema={schema}
            enableReinitialize
            innerRef={form_ref}
            initialValues={initial_values}
            onSubmit={(values, form) => {
                onChange(values, form).then(() => {
                    form.setSubmitting(false);
                });
            }}
        >
            {({ values, handleChange, setFieldValue }) => {
                const getPersona = (type, documentNumber) => {
                    getPersonalInformation(type, documentNumber).then((res: any) => {
                        setFieldValue('names.firstName', res.first_name ?? '', false);
                        setFieldValue('names.lastName', res.last_name ?? '', false);
                        setFieldValue('surnames.firstSurname', res.first_surname ?? '', false);
                        setFieldValue('surnames.lastSurname', res.last_surname ?? '', false);
                        setFieldValue('email', res.email ?? '', false);
                        setFieldValue('phoneNumber', res.phone_number ?? '', false);
                        setFieldValue('phoneNumber_ext', res.phone_number_ext ?? '', false);
                        setFieldValue('gender', res.gender ?? '', false);
                        setFieldValue('id', res.id ?? '', false);
                        setFieldValue('company_name', res.company_name ?? '', false);
                        setFieldValue('location', res?.localization?.address ?? '', false);
                        setFieldValue('post', res?.post ?? '', false);
                    });
                };
                return (
                    <Form>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="id" className="form-label">
                                    Tipo de Documento
                                </label>
                                <Field
                                    as="select"
                                    className="form-select"
                                    id="documentType"
                                    name="documentType"
                                    autoComplete="off"
                                    disabled={disabled}
                                    onChange={(ev) => {
                                        ev.preventDefault();
                                        setFieldValue('id', '', false);
                                        handleChange(ev);
                                        const id_t = ev.target.value;
                                        const id_n = values.documentNumber;
                                        if (id_n && id_t) {
                                            getPersona(id_t, id_n);
                                        }
                                    }}
                                >
                                    <option value="" hidden>
                                        --Tipo de Documento--
                                    </option>
                                    <option value="CC">Cédula de Ciudadanía</option>
                                    <option value="TI">Tarjeta de identidad</option>
                                    <option value="CE">Cédula de Extranjería</option>
                                    {withNit && <option value="NIT">NIT</option>}
                                </Field>
                                <ErrorMessage name="documentType" />
                            </div>
                            <div className={`col-12 col-lg-${values.documentType === 'NIT' ? 6 : 3}`}>
                                <label htmlFor="username" className="form-label">
                                    Número {values.documentType === 'NIT' ? 'de Nit' : 'de documento'}
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="documentNumber"
                                    placeholder={`Número ${values.documentType === 'NIT' ? 'de Nit' : 'de documento'}`}
                                    name="documentNumber"
                                    autoComplete="off"
                                    disabled={disabled}
                                    min={0}
                                    onChange={(ev) => {
                                        ev.preventDefault();
                                        setFieldValue('id', '', false);
                                        // handleChange(ev);
                                        const { value } = ev.target;
                                        const regex = /^[0-9,-]*$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(ev);
                                        }
                                    }}
                                    onBlur={(ev) => {
                                        const id_n = ev.target.value;
                                        const id_t = values.documentType;
                                        if (id_n && id_t) {
                                            getPersona(id_t, id_n);
                                        }
                                    }}
                                />
                                <ErrorMessage name="documentNumber" />
                            </div>
                            {values.documentType !== 'NIT' && (
                                <div className="col-12 col-6 col-lg-3">
                                    <label htmlFor="username" className="form-label">
                                        Género
                                    </label>
                                    <Field
                                        as="select"
                                        className="form-select"
                                        id="gender"
                                        name="gender"
                                        autoComplete="off"
                                        disabled={disabled}
                                    >
                                        <option value="" hidden>
                                            --Género--
                                        </option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                        <option value="I">Intersexual</option>
                                        <option value="NA">No Deseo Responder</option>
                                    </Field>
                                    <ErrorMessage name="gender" />
                                </div>
                            )}
                        </div>
                        <div className="row">
                            {values.documentType === 'NIT' && (
                                <div className="col-12">
                                    <label htmlFor="first_name_id" className="form-label">
                                        Nombre
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="first_name_id"
                                        name="company_name"
                                        placeholder="Nombre"
                                        autoComplete="off"
                                        disabled={disabled}
                                        maxLength={20}
                                    />
                                    <ErrorMessage name="company_name" />
                                </div>
                            )}
                            {values.documentType !== 'NIT' && (
                                <Fragment>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="first_name_id" className="form-label">
                                            Primer Nombre
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="first_name_id"
                                            name="names.firstName"
                                            placeholder="Primer Nombre"
                                            autoComplete="off"
                                            disabled={disabled}
                                            maxLength={20}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="names.firstName" />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="second_name_id" className="form-label">
                                            Segundo Nombre
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="second_name_id"
                                            name="names.lastName"
                                            placeholder="Segundo Nombre"
                                            autoComplete="off"
                                            disabled={disabled}
                                            maxLength={20}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="names.lastName" />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="surname_id" className="form-label">
                                            Primer apellido
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="surname_id"
                                            name="surnames.firstSurname"
                                            placeholder="Primer Apellido"
                                            autoComplete="off"
                                            disabled={disabled}
                                            maxLength={20}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="surnames.firstSurname" />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="second_surname_id" className="form-label">
                                            Segundo apellido
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="second_surname_id"
                                            name="surnames.lastSurname"
                                            placeholder="Segundo Apellido"
                                            autoComplete="off"
                                            disabled={disabled}
                                            maxLength={20}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="surnames.lastSurname" />
                                    </div>
                                </Fragment>
                            )}
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="row">
                                    <label htmlFor="username" className="form-label">
                                        Teléfono
                                    </label>
                                    <div className="col-8">
                                        <Field
                                            type="number"
                                            className="form-control"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            placeholder="Teléfono"
                                            autoComplete="off"
                                            disabled={disabled}
                                            min={0}
                                        />
                                        <ErrorMessage name="phoneNumber" />
                                    </div>
                                    <div className="col-4">
                                        <Field
                                            type="number"
                                            className="form-control"
                                            id="phoneNumber_ext"
                                            name="phoneNumber_ext"
                                            placeholder="Ext"
                                            autoComplete="off"
                                            disabled={disabled}
                                            min={0}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(`^[+]?\\d{0,3}$`);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="phoneNumber_ext" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <label htmlFor="username" className="form-label">
                                    Correo Electrónico
                                </label>
                                <Field
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Correo"
                                    name="email"
                                    autoComplete="off"
                                    disabled={disabled}
                                    maxLength={20}
                                />
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        {disposition && !withNit && (
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <label htmlFor="post_id" className="form-label">
                                        Cargo
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="post_id"
                                        name="post"
                                        placeholder="Cargo"
                                        autoComplete="off"
                                        disabled={disabled}
                                        min={0}
                                    />
                                    <ErrorMessage name="post" />
                                </div>
                            </div>
                        )}
                        {disposition && withNit && (
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="location_id" className="form-label">
                                        Dirección
                                    </label>
                                    <div className="input-group">
                                        <Field
                                            name="location"
                                            id="location_id"
                                            type="text"
                                            className="form-control"
                                            disabled
                                        // value={`${formik.values.location.commune}, ${formik.values.location.neighborhood}`}
                                        />
                                        <div className="input-group-prepend">
                                            <LocationModal
                                                view="user"
                                                onSave={async (values: any) => {
                                                    console.log('valores modal', values);
                                                    setFieldValue('location_id', `${values.id}`, false);
                                                    setFieldValue('location', `${values.address}`, false);
                                                    return Promise.resolve();
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage name="location" />
                                </div>
                            </div>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

interface PersonaMProps extends FieldProps {
    type: 'create' | 'edit';
    disposition: boolean;
    withNit: boolean;
}

const PersonaM: FC<PersonaMProps> = ({ field, form, type, disposition, withNit, ...props }) => {
    const on_change = async (value) => {
        if (value.hasOwnProperty('id') && value.id) {
            updatePersonalInformation(value).then((res) => {
                form.setFieldValue(field.name, res, false);
            });
        } else {
            newPersonalInformation(value).then((res) => {
                form.setFieldValue(field.name, res, false);
            });
        }
    };
    return (
        <PersonaModal
            {...props}
            type={type}
            persona={field.value}
            modal_name={field.value?.label}
            onChange={on_change}
            disposition={disposition}
            withNit={withNit}
        />
    );
};

PersonaM.defaultProps = {
    disposition: false,
    withNit: false,
};
export default PersonaM;
