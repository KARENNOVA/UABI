import { FC, MutableRefObject, useState } from 'react';
import { IUserAttributes } from '../../../utils/interfaces/users';
import LocationModal from '../../../utils/components/Location/LocationModal';
import { Formik, Form, Field, FormikProps, FormikValues } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../../utils/ui/error_messge';
import dependencias from '../../acquisitions/dependencias';
import Select from '../../../utils/ui/select';
import { useSelector } from 'react-redux';

interface IUserFormPros {
    user?: IUserAttributes;
    address?: string;
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    onSubmit: (values, actions?) => Promise<any>;
    innerRef?: MutableRefObject<FormikProps<FormikValues>>;
}

const GeneralForm: FC<IUserFormPros> = ({ type, disabled, onSubmit, user, address, innerRef }) => {


    // const history = useHistory();
    const [subs, set_subs] = useState<any[]>([]);
    const roles = useSelector((store: any) => store.auth.user.roles);
    const is_admin = !!roles.find((r) => r.name === 'Administrador');
    const initial_values = {
        user: {
            id_number: '',
            password: '',
            ...(user ? { id_number: user.id_number } : {}),
        },
        detailsUser: {
            id: '',
            society_type: '',
            entity_type: '',
            id_type: '',
            names: { firstName: '', lastName: '' },
            surnames: { firstSurname: '', lastSurname: '' },
            email: '',
            location: '',
            str_location: address ?? '',
            cellphone_number: '',
            phone_number: '',
            phone_number_ext: '',
            gender: '',
            dependency: '',
            subdependency: '',
            ...user,
        },
    };

    const schema = Yup.object().shape({
        user: Yup.object().shape({
            id_number: Yup.number().required('Campo obligatorio'),
            password: Yup.string()
                .matches(/(?=.*[0-9])/, 'debe contener almenos 1 numero')
                .matches(/(?=.*[@$!%*?&,.#])/, 'debe contener almenos 1 caracter special')
                .min(8, 'minimo 8 caracteres'),
        }),
        detailsUser: Yup.object().shape({
            // location: Yup.string().required('Campo obligatorio'),
            society_type: Yup.string().required('Campo obligatorio'),
            entity_type: Yup.string().required('Campo obligatorio'),
            id_type: Yup.string().required('Campo obligatorio'),
            names: Yup.object().shape({
                firstName: Yup.string().required('Campo obligatorio'),
            }),
            surnames: Yup.object().shape({
                firstSurname: Yup.string().required('Campo obligatorio'),
            }),
            email: Yup.string().email('email invalido').required('Campo obligatorio'),
            cellphone_number: Yup.number().required('Campo obligatorio'),
            phone_number: Yup.number().required('Campo obligatorio'),
            gender: Yup.string().required('Campo obligatorio'),
            dependency: Yup.string()
                .when('entity_type', {
                    is: 'P',
                    then: Yup.string().required('Campo obligatorio'),
                })
                .nullable(),
            subdependency: Yup.string()
                .when('entity_type', {
                    is: 'P',
                    then: Yup.string().required('Campo obligatorio'),
                })
                .nullable(),
        }),
    });

    const submit = (values, actions) => {
        onSubmit(values, actions)
            .then(() => {
                actions.setSubmitting(false);
            })
            .catch(() => actions.setSubmitting(false));

        //type === 'create' && history.push(`/users/permits/${initial_values.id}/`);
    };

    const format_list = (list) => {
        //cpopiar
        if (list && Array.isArray(list)) {
            let aux_list = [...list];
            aux_list = aux_list.map((d: any) => ({
                name: d.name,
                id: d.name,
            }));
            if (aux_list.length > 0) {
                return aux_list;
            }
        }
        return [];
    };

    const dependency_ops = format_list(dependencias);
    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            initialValues={initial_values}
            validationSchema={schema}
            innerRef={innerRef}
        >
            {({ values, isValid, isSubmitting, setFieldValue, handleChange, errors, }) => {
                return (
                    <Form>
                        <div className="row">
                            <div className={`col-${values.entity_type === 'Publica' ? 3 : 6}`}>
                                <label htmlFor="id" className="form-label">
                                    Tipo de Sociedad <span className="text-danger">*</span>
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
                                        --Tipo de Sociedad--
                                    </option>
                                    <option value="N">Persona Natural</option>
                                    <option value="J">Persona Juridica</option>
                                </Field>
                                <ErrorMessage name="detailsUser.society_type" />
                            </div>
                            <div className={`col-${values.entity_type === 'Publica' ? 3 : 6}`}>
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
                                        --Tipo de Entidad--
                                    </option>
                                    <option value="O">Organizacion sin Animo de lucro</option>
                                    <option value="T">Otro</option>
                                    <option value="R">Privada</option>
                                    <option value="P">Publica</option>
                                </Field>
                                <ErrorMessage name="detailsUser.entity_type" />
                            </div>
                            {values.detailsUser.entity_type === 'P' && (
                                <>
                                    <div className="col-6">
                                        <label htmlFor="dependency_id" className="form-label">
                                            Dependecia <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            component={Select}
                                            name="detailsUser.dependency"
                                            id="dependency_id"
                                            disabled={disabled}
                                            placeholder="Selecciona una Dependencia"
                                            options={dependency_ops}
                                            showSearch
                                            extra_on_change={(value) => {
                                                if (value) {
                                                    const dependency = dependencias.find((d) => d.name === value);
                                                    const _subs = format_list(dependency.subs);
                                                    setFieldValue('detailsUser.subdependency', dependency.name);
                                                    // console.log(_subs);
                                                    set_subs(_subs);
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
                                    <div className="col-6">
                                        <label htmlFor="subdependency_id" className="form-label">
                                            Sub. Dependecia <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            component={Select}
                                            name="detailsUser.subdependency"
                                            id="subdependency_id"
                                            disabled={disabled || !values.detailsUser.dependency || subs.length === 0}
                                            placeholder="Selecciona una Sub. Dependencia"
                                            options={subs}
                                            showSearch
                                            allowClear
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
                            <div className="col-3">
                                <label htmlFor="first_name_id" className="form-label">
                                    Primer Nombre <span className="text-danger">*</span>
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
                                />
                                <ErrorMessage name="detailsUser.names.firstName" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="second_name_id" className="form-label">
                                    Segundo Nombre
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
                                />
                                <ErrorMessage name="detailsUser.names.lastName" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="surname_id" className="form-label">
                                    Primer apellido <span className="text-danger">*</span>
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="surname_id"
                                    name="detailsUser.surnames.firstSurname"
                                    placeholder="Primer pellido"
                                    autoComplete="off"
                                    disabled={disabled}
                                    maxLength={20}
                                />
                                <ErrorMessage name="detailsUser.surnames.firstSurname" />
                            </div>
                            <div className="col-3">
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
                                />
                                <ErrorMessage name="detailsUser.surnames.lastSurname" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
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
                            <div className="col-3">
                                <label htmlFor="username" className="form-label">
                                    Número de documento <span className="text-danger">*</span>
                                </label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="id_number"
                                    placeholder="Número de documento"
                                    name="user.id_number"
                                    autoComplete="off"
                                    disabled={disabled}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { value } = e.target;
                                        const regex = /^[+]?\d{0,20}$/;
                                        if (regex.test(value.toString())) {
                                            handleChange(e);
                                        }
                                    }}
                                />
                                <ErrorMessage name="user.id_number" withCount max={20} />
                            </div>
                            <div className={`col-${type === 'create' || is_admin ? 3 : 6}`}>
                                <label htmlFor="username" className="form-label">
                                    Correo Electronico <span className="text-danger">*</span>
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
                                <div className="col-3">
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
                            <div className="col-3">
                                <label htmlFor="username" className="form-label">
                                    Celular <span className="text-danger">*</span>
                                </label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="cellphone_number"
                                    name="detailsUser.cellphone_number"
                                    placeholder="celular"
                                    autoComplete="off"
                                    disabled={disabled}
                                    maxLength={20}
                                />
                                <ErrorMessage name="detailsUser.cellphone_number" />
                            </div>
                            <div className="col-3">
                                <div className="row">
                                    <div className="col-8">
                                        <label htmlFor="phone_number" className="form-label">
                                            Teléfono <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            id="phone_number"
                                            name="detailsUser.phone_number"
                                            placeholder="Teléfono"
                                            autoComplete="off"
                                            disabled={disabled}
                                            maxLength={20}
                                        />
                                        <ErrorMessage name="detailsUser.phone_number" />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="phone_number_ext" className="form-label">
                                            Ext
                                        </label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            id="phone_number_ext"
                                            name="detailsUser.phone_number_ext"
                                            autoComplete="off"
                                            disabled={disabled}
                                            maxLength={20}
                                        />
                                        <ErrorMessage name="detailsUser.phone_number_ext" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
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
                                        --Selecciona Género--
                                    </option>
                                    <option value="F">Femenino</option>
                                    <option value="M">Masculino</option>
                                    <option value="I">Intersexual</option>
                                    <option value="NA">No Deseo Responder</option>
                                </Field>
                                <ErrorMessage name="detailsUser.gender" />
                            </div>
                            <div className="form-group col-3">
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
                                                setFieldValue('detailsUser.str_location', values.address);
                                                setFieldValue('detailsUser.location', `${values.id}`);
                                            }}
                                        />
                                    </div>
                                </div>
                                <ErrorMessage name="detailsUser.location" />
                            </div>
                        </div>
                        {type === 'view' && (
                            <div className="row">
                                <div className="col-3">
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
                        {/* {!innerRef && (
                            <div className="row justify-content-end">
                                <div className="col text-end">
                                    {type !== 'view' && (
                                        <button
                                            className="btn btn-primary my-3"
                                            disabled={isSubmitting || disabled}
                                            type="submit"
                                        >
                                            Guardar{' '}
                                            {isSubmitting && (
                                                <i
                                                    className="fa fa-spinner fa-spin"
                                                    style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                                                />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )} */}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default GeneralForm;
