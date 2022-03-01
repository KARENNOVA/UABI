
import React, { FC, useContext, useState } from 'react';
import ErrorMessage from '../../../utils/ui/error_messge';
import Select from '../../../utils/ui/select';
import LocationModal from '../../../utils/components/Location/LocationModal';
import { Field } from 'formik';
import { useSelector } from 'react-redux';
import { TemplateContext } from '../../../utils/components/template/template_context';

interface IUserFormPros {
    // user?: IUserAttributes;
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    formik: any;
    dependencies?: any;
}


const Dataformuser: FC<IUserFormPros> = ({ type, disabled, formik, dependencies }) => {
    const [subs, set_subs] = useState<any[]>([]);
    const roles = useSelector((store: any) => store.auth.user.roles);
    const is_admin = !!roles.find((r) => r.name === 'Administrador');
    const context = useContext(TemplateContext);

    return (
        <>
            <div className="row">
                <div className={`col-lg-${formik.values.entity_type === 'Publica' ? 3 : 6} col-12 col-md-6`}>
                    <label htmlFor="id" className="form-label">
                        Tipo de sociedad <span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="form-select"
                        id="society_type"
                        name="detailsUser.society_type"
                        autoComplete="off"
                        disabled={disabled}
                    >
                        <option value="" hidden>
                            --Tipo de sociedad--
                        </option>
                        <option value="N">Persona natural</option>
                        <option value="J">Persona jurídica</option>
                    </Field>
                    <ErrorMessage name="detailsUser.society_type" />
                </div>
                <div className={`col-12 col-md-6 col-lg-${formik.values.entity_type === 'Publica' ? 3 : 6}`}>
                    <label htmlFor="id" className="form-label">
                        Tipo Entidad <span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="form-select"
                        id="entity_type"
                        name="detailsUser.entity_type"
                        autoComplete="off"
                        disabled={disabled}
                    >
                        <option value="" hidden>
                            --Tipo de entidad--
                        </option>
                        <option value="O">Organizacion sin animo de lucro</option>
                        <option value="T">Otro</option>
                        <option value="R">Privada</option>
                        <option value="P">Publica</option>
                    </Field>
                    <ErrorMessage name="detailsUser.entity_type" />
                </div>
                {formik.values.detailsUser.entity_type === 'P' && (
                    <>
                        <div className="col-12 col-lg-6 col-md-6">
                            <label htmlFor="dependency_id" className="form-label">
                                Dependencia o secretaría <span className="text-danger">*</span>
                            </label>
                            <Field
                                component={Select}
                                name="detailsUser.dependency"
                                id="dependency_id"
                                disabled={disabled}
                                placeholder="Selecciona una Dependencia"
                                options={dependencies?.map((d) => ({ id: d.dependency, name: d.dependency }))}
                                showSearch
                                extra_on_change={(value) => {
                                    if (value) {
                                        const dependency = dependencies.find((d) => d.dependency === value);
                                        const _subs = dependency.subs;
                                        set_subs(_subs);
                                        const subdependency = _subs.find((d) => d.subdependency === dependency.dependency);
                                        if (subdependency !== undefined) {
                                            formik.setFieldValue('detailsUser.subdependency', subdependency.subdependency);
                                            formik.setFieldValue('detailsUser.cost_center_id', subdependency.id);
                                        }
                                        // const dependency = dependencias.find((d) => d.name === value);
                                        // const _subs = format_list(dependency.subs);
                                        // formik.setFieldValue('detailsUser.subdependency', dependency.name);
                                        // // console.log(_subs);
                                        // set_subs(_subs);
                                    }
                                }}
                                filterOption={(input, option) => {
                                    return (
                                        option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    );
                                }}
                            />
                            <ErrorMessage name="detailsUser.dependency" />
                        </div>
                        <div className="col-12 col-lg-6 col-md-6">
                            <label htmlFor="subdependency_id" className="form-label">
                                Subsecretaría o subdirección<span className="text-danger">*</span>
                            </label>
                            <Field
                                component={Select}
                                name="detailsUser.subdependency"
                                id="subdependency_id"
                                disabled={disabled || !formik.values.detailsUser.dependency || subs.length === 0}
                                placeholder="Selecciona una Sub. Dependencia"
                                options={subs?.map((d) => ({ id: d.subdependency, name: d.subdependency }))}
                                showSearch
                                allowClear
                                extra_on_change={(value) => {
                                    if (value) {
                                        const dependency = dependencies.find(
                                            (d) => d.dependency === formik.values.dependency
                                        );
                                        const subdependency = dependency?.subs?.find((d) => d.subdependency === value);
                                        formik.setFieldValue('cost_center_id', subdependency.id);
                                    }
                                }}
                                filterOption={(input, option) => {
                                    return (
                                        option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    );
                                }}
                            />
                            <ErrorMessage name="detailsUser.subdependency" />
                        </div>
                    </>
                )}
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="first_name_id" className="form-label">
                        Primer nombre <span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="first_name_id"
                        name="detailsUser.names.firstName"
                        placeholder="Primer nombre"
                        autoComplete="off"
                        disabled={disabled}
                        maxLength={20}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}

                    />
                    <ErrorMessage name="detailsUser.names.firstName" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="second_name_id" className="form-label">
                        Segundo nombre
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="second_name_id"
                        name="detailsUser.names.lastName"
                        placeholder="Segundo nombre"
                        autoComplete="off"
                        disabled={disabled}
                        maxLength={20}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="detailsUser.names.lastName" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="surname_id" className="form-label">
                        Primer apellido <span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="surname_id"
                        name="detailsUser.surnames.firstSurname"
                        placeholder="Primer apellido"
                        autoComplete="off"
                        disabled={disabled}
                        maxLength={20}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="detailsUser.surnames.firstSurname" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="second_surname_id" className="form-label">
                        Segundo apellido
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="second_surname_id"
                        name="detailsUser.surnames.lastSurname"
                        placeholder="Segundo apellido"
                        autoComplete="off"
                        disabled={disabled}
                        maxLength={20}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="detailsUser.surnames.lastSurname" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="id" className="form-label">
                        Tipo de documento <span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="form-select"
                        id="id_type"
                        name="detailsUser.id_type"
                        autoComplete="off"
                        disabled={disabled}
                    >
                        <option value="" hidden>
                            --Tipo de documento--
                        </option>
                        <option value={1}>Cedula de Ciudadania</option>
                        <option value={2}>Tarjeta de identidad</option>
                        <option value={3}>Cedula de Extranjeria</option>
                        <option value={4}>NIT</option>
                    </Field>
                    <ErrorMessage name="detailsUser.id_type" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="username" className="form-label">
                        Número de documento <span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="id_number"
                        placeholder="Número de documento"
                        name="user.id_number"
                        autoComplete="off"
                        disabled={disabled}
                        maxLength={20}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9,-]*$/;
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}

                    // onChange={(e) => {
                    //     e.preventDefault();
                    //     const { value } = e.target;
                    //     const regex = /^[+]?\d{0,20}$/;
                    //     if (regex.test(value.toString())) {
                    //         formik.handleChange(e);
                    //     }
                    // }}
                    />
                    <ErrorMessage name="user.id_number" withCount max={20} />
                </div>
                <div className={`col-12 col-md-6 col-lg-${type === 'create' || is_admin ? 3 : 6}`}>
                    <label htmlFor="username" className="form-label">
                        Correo electrónico <span className="text-danger">*</span>
                    </label>
                    <Field
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Correo"
                        name="detailsUser.email"
                        autoComplete="off"
                        disabled={disabled}
                        maxLength={100}
                    />
                    <ErrorMessage name="detailsUser.email" />
                </div>
                {(type === 'create' || is_admin) && (
                    <div className="col-12 col-lg-3 col-md-6">
                        <label htmlFor="username" className="form-label">
                            Contraseña
                        </label>
                        <Field
                            type="password"
                            className="form-control"
                            id="password_id"
                            name="user.password"
                            autoComplete="off"
                            disabled={disabled}
                        />
                        <ErrorMessage name="user.password" />
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="username" className="form-label">
                        Celular <span className="text-danger">*</span>
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="cellphone_number"
                        name="detailsUser.cellphone_number"
                        placeholder="celular"
                        autoComplete="off"
                        disabled={disabled}
                        maxLength={20}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = /^[0-9]{0,20}$/;
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="detailsUser.cellphone_number" withCount max={20} />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <div className="row">
                        <div className="col-8">
                            <label htmlFor="phone_number" className="form-label">
                                Teléfono <span className="text-danger">*</span>
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="phone_number"
                                name="detailsUser.phone_number"
                                placeholder="Teléfono"
                                autoComplete="off"
                                disabled={disabled}
                                maxLength={20}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const { value } = e.target;
                                    const regex = /^[0-9]{0,20}$/;
                                    if (regex.test(value.toString())) {
                                        formik.handleChange(e);
                                    }
                                }}
                            />
                            <ErrorMessage name="detailsUser.phone_number" withCount max={20} />
                        </div>
                        <div className="col-4">
                            <label htmlFor="phone_number_ext" className="form-label">
                                Ext
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="phone_number_ext"
                                name="detailsUser.phone_number_ext"
                                autoComplete="off"
                                disabled={disabled}
                                maxLength={3}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const { value } = e.target;
                                    const regex = /^[0-9]{0,3}$/;
                                    if (regex.test(value.toString())) {
                                        formik.handleChange(e);
                                    }
                                }}
                            />
                            <ErrorMessage name="detailsUser.phone_number_ext" withCount max={3} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="username" className="form-label">
                        Género <span className="text-danger">*</span>
                    </label>
                    <Field
                        as="select"
                        className="form-select"
                        id="gender"
                        name="detailsUser.gender"
                        autoComplete="off"
                        disabled={disabled}
                    >
                        <option value="" hidden>
                            --Selecciona género--
                        </option>
                        <option value="F">Femenino</option>
                        <option value="M">Masculino</option>
                        <option value="I">Intersexual</option>
                        <option value="NA">No deseo responder</option>
                    </Field>
                    <ErrorMessage name="detailsUser.gender" />
                </div>
                <div className="form-group col-12 col-lg-3 col-md-6">
                    <label htmlFor="location" className="form-label">
                        Dirección <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <Field
                            name="detailsUser.str_location"
                            id="location"
                            type="text"
                            className="form-control"
                            disabled

                        />

                        <div className="input-group-prepend">
                            <LocationModal
                                view="user"
                                disabled={disabled}
                                onSave={async (values) => {
                                    formik.setFieldValue('detailsUser.str_location', values.address);
                                    formik.setFieldValue('detailsUser.location', values.id);
                                }}
                            />
                        </div>
                    </div>
                    <ErrorMessage name="detailsUser.location" />
                </div>
            </div>
            {type === 'view' && (
                <div className="row">
                    <div className="col-12 col-lg-3 col-md-6">
                        <label htmlFor="id_rol" className="form-label">
                            Rol
                        </label>
                        <Field
                            as="select"
                            className="form-select"
                            id="id_rol"
                            name="detailsUser.id_rol"
                            autoComplete="off"
                            disabled={disabled}
                        >
                            <option value="" hidden>
                                Selecciona un rol
                            </option>
                            <option value="2">Supervisor</option>
                            <option value="3">Adquisiciónes</option>
                            <option value="4">SABI</option>
                            <option value="5">Asegurabilidad</option>
                            <option value="6">Inspección</option>
                            <option value="7">Disposición</option>
                            <option value="8">Supervisión</option>
                            <option value="9">Mantenimiento</option>
                            <option value="10">Facturación</option>
                        </Field>
                        <ErrorMessage name="detailsUser.id_rol" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Dataformuser;
