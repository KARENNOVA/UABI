import { FC, useEffect, useState, MutableRefObject, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../utils/ui/error_messge';
import { IProjectAttributes } from '../../../utils/interfaces/';
import * as Yup from 'yup';
import Select from '../../../utils/ui/select';
// import dependencias from '../dependencias';
import { formatDate } from '../../../utils';
import { Card } from '../../../utils/ui';
import { AntRangePicker } from '../../../utils/ui/date_picker';
import { LinkButton } from '../../../utils/ui/link';
import { Empty } from 'antd';
import { FormikProps } from 'formik';
import { FormikValues } from 'formik';
import { TemplateContext } from '../../../utils/components/template/template_context';

interface ProjectFormPros {
    project?: IProjectAttributes;
    onSubmit?: (values, form?) => Promise<any>;
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    innerRef?: MutableRefObject<FormikProps<FormikValues>>;
    dependencies?: any;
}
const ProjectForm: FC<ProjectFormPros> = ({ project, onSubmit, disabled, type, innerRef, dependencies }) => {
    const [subs, set_subs] = useState<any[]>([]);
    const context = useContext(TemplateContext);

    const empty_contract = {
        contract_number: '',
        validity: {
            start_date: '',
            end_date: '',
        },
        contractor: '',
    };
    const initial_values = {
        id: '',
        name: '',
        description: '',
        dependency: '',
        subdependency: '',
        cost_center_id: "",
        budget_value: '',
        contracts: [],
        management_center: "",
        cost_center: "",
        ...project,
    };

    const schema = Yup.object().shape({
        name: Yup.string().required('Campo obligatorio').max(200, 'El nombre debe tener maximo 200 caracteres'),
        description: Yup.string()
            .required('Campo obligatorio')
            .max(1000, 'La Descripción debe tener maximo 1000 caracteres'),
        dependency: Yup.string().required('Campo obligatorio'),
        budget_value: Yup.number().required('obligatorio')
            .min(0, 'El minimo es 0')
            .max(9999999999, 'El maximo 10 es caracteres'),

    });

    const submit = (values, form) => {
        const aux_values = { ...values };
        onSubmit(aux_values, form)
            .then(() => {
                form.setSubmitting(false);
            })
            .catch(() => form.setSubmitting(false));
    };
    const format_list = (list) => {
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




    useEffect(() => {
        if (project) {
            const dependency = dependencies.find((d) => d.dependency === project.dependency);
            const _subs = dependency?.subs;
            if (_subs !== undefined) {
                set_subs(_subs);
            }
        } else {
            set_subs([]);
        }
    }, [project]);

    // const dependency_ops = format_list(dependencias);

    // useEffect(() => {
    //     if (project) {
    //         const dependency = dependencias.find((d) => d.name === project.dependency);
    //         const _subs = format_list(dependency?.subs);
    //         set_subs(_subs);
    //     } else {
    //         set_subs([]);
    //     }
    // }, [project]);


    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initial_values} validationSchema={schema} innerRef={innerRef}>
            {({ values, isSubmitting, setFieldValue, handleChange }) => {
                const number_validate = (limit?: number) => (e) => {
                    e.preventDefault();
                    const regex = new RegExp(`^[+]?\\d${limit ? `{0,${limit}}` : '*'}$`);
                    if (regex.test(e.target.value.toString())) {
                        handleChange(e);
                    }
                };
                return (
                    <Form>
                        <Card title="Información del Proyecto">
                            <div className="row">
                                {project && context.device !== "md" && (
                                    <div className="col-12 col-md-6 col-lg-3">
                                        <label htmlFor="id_id" className="form-label">
                                            Código del proyecto
                                        </label>
                                        <Field
                                            type="text"
                                            id="id_id"
                                            className="form-control"
                                            aria-describedby="codigo del projecto"
                                            disabled={true}
                                            name="id"
                                            autoComplete="off"
                                        />
                                        <ErrorMessage name="id" />
                                    </div>
                                )}
                                <div className={`col-12 col-md-6 col-lg-${project ? 3 : 4}`}>
                                    <label htmlFor="name_id" className="form-label">
                                        Nombre del proyecto
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="name_id"
                                        aria-describedby="nombre del projecto"
                                        name="name"
                                        autoComplete="off"
                                        disabled={disabled}
                                        maxLength={20}
                                    />
                                    <ErrorMessage name="name" />
                                </div>
                                <div className={`col-12 col-md-6 col-lg-${project ? 3 : 4}`}>
                                    <label htmlFor="dependency_id" className="form-label">
                                        Dependecia o Secretaría
                                    </label>
                                    <Field
                                        component={Select}
                                        name="dependency"
                                        id="dependency_id"
                                        disabled={disabled}
                                        placeholder="Selecciona una Dependencia"
                                        options={dependencies?.map((d) => ({ id: d.dependency, name: d.dependency }))} /* dependency_ops*/
                                        //options={dependency_ops}
                                        showSearch
                                        extra_on_change={(value) => {
                                            if (value) {
                                                const dependency = dependencies.find((d) => d.dependency === value);
                                                const _subs = dependency.subs;
                                                //setFieldValue('subdependency', dependency.dependency);
                                                setFieldValue('cost_center', dependency.management_center);
                                                setFieldValue('management_center', dependency.management_center);
                                                set_subs(_subs);
                                                const subdependency = _subs.find((d) => d.subdependency === dependency.dependency);
                                                if (subdependency !== undefined) {
                                                    setFieldValue('subdependency', subdependency.subdependency);
                                                    setFieldValue('cost_center_id', subdependency.id);
                                                }
                                            }
                                        }}
                                        filterOption={(input, option) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="dependency" />
                                </div>
                                <div className={`col-12 col-md-6 col-lg-${project ? 3 : 4}`}>
                                    <label htmlFor="subdependency_id" className="form-label">
                                        Subsecretaría o Subdirección
                                    </label>
                                    <Field
                                        component={Select}
                                        name="subdependency"
                                        id="subdependency_id"
                                        disabled={disabled || !values.dependency || subs.length === 0}
                                        placeholder="Selecciona una Sub. Dependencia"
                                        options={subs?.map((d) => ({ id: d.subdependency, name: d.subdependency }))}
                                        showSearch
                                        allowClear
                                        extra_on_change={(value) => {
                                            if (value) {
                                                const dependency = dependencies.find(
                                                    (d) => d.dependency === values.dependency
                                                );
                                                const subdependency = dependency.subs.find((d) => d.subdependency === value);
                                                console.log(subdependency)
                                                setFieldValue('cost_center', subdependency.cost_center);
                                                setFieldValue('cost_center_id', subdependency.id);
                                            }
                                        }}
                                        filterOption={(input, option) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="subdependency" />
                                </div>

                                <div className="form-group col-md-6 col-12 col-lg-4">
                                    <label htmlFor="management_center_id" className="form-label">
                                        Centro Gestor
                                    </label>
                                    <Field
                                        disabled
                                        name="management_center"
                                        type="text"
                                        className="form-control"
                                        id="management_center_id"
                                    />
                                    <ErrorMessage name="cost_center" />
                                </div>
                                <div className="form-group col-md-6 col-12 col-lg-4">
                                    <label htmlFor="cost_center_id" className="form-label">
                                        Centro de Costos
                                    </label>
                                    <Field
                                        disabled
                                        name="cost_center"
                                        type="text"
                                        className="form-control"
                                        id="cost_center_id"
                                    />
                                    <ErrorMessage name="cost_center" />
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <label htmlFor="budget_value" className="form-label">
                                        Valor Presupuestal
                                    </label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-end-0">$</span>
                                        </div>
                                        <Field
                                            disabled={disabled}
                                            name="budget_value"
                                            type="number"
                                            id="budget_value_id"
                                            className="form-control border-start-0 text-end"
                                            min={0}
                                            max={9999999999}
                                            // onChange={number_validate(10)}

                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="description_id" className="form-label">
                                        Descripción
                                    </label>
                                    <Field
                                        as="textarea"
                                        className="form-control"
                                        id="description_id"
                                        aria-describedby="emailHelp"
                                        placeholder="Descripción del Proyecto"
                                        name="description"
                                        disabled={disabled}
                                        autoComplete="off"
                                        maxLength={1000}
                                    />
                                    <ErrorMessage name="description" withCount max={1000} />
                                </div>
                            </div>
                            <div className="row">
                                {type === 'view' && (
                                    <>
                                        <div className="row">
                                            <div className="col-12 col-lg-6">
                                                <label htmlFor="audit_trail_created_on_id" className="form-label">
                                                    Fecha de creación
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="audit_trail_created_on_id"
                                                    name="audit_trail.created_on"
                                                    value={formatDate(project?.audit_trail?.created_on)}
                                                    disabled
                                                />
                                                <ErrorMessage />
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <label htmlFor="audit_trail_created_by_id" className="form-label">
                                                    Creado por
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="audit_trail_created_by_id"
                                                    name="audit_trail.created_by"
                                                    disabled
                                                />
                                                <ErrorMessage />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* <div className="row justify-content-end">
                                <div className="col text-end">
                                    {type !== 'view' && (
                                        <button className="btn btn-primary my-3" disabled={isSubmitting || disabled}>
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
                            </div> */}
                        </Card>
                        <Card
                            title="Contratos"
                            extra={
                                <LinkButton
                                    name={'Agregar Contrato'}
                                    iconText="+"
                                    avatar
                                    onClick={() => {
                                        setFieldValue(
                                            'contracts',
                                            [
                                                ...values.contracts,
                                                {
                                                    ...empty_contract,
                                                },
                                            ],
                                            false
                                        );
                                    }}
                                />
                            }
                        >
                            {values.contracts?.length > 0 &&
                                values.contracts?.map((contract, i) => (
                                    <div className="row" key={i}>
                                        <div className="col-12 col-lg-3">
                                            <label htmlFor="contract_number_id" className="form-label">
                                                Numero de Contrato
                                            </label>
                                            <Field
                                                type="number"
                                                className="form-control"
                                                id="contract_number_id"
                                                aria-describedby="nombre del projecto"
                                                name={`contracts[${i}].contract_number`}
                                                autoComplete="off"
                                                disabled={disabled}
                                                maxLength={20}
                                            />
                                            <ErrorMessage name={`contracts[${i}].contract_number`} />
                                        </div>
                                        <div className="col-12 col-lg-5">
                                            <div className="form-group">
                                                <label>Vigencia</label>
                                                <Field
                                                    component={AntRangePicker}
                                                    name={`contracts[${i}].validity`}
                                                    className="ant-date-range"
                                                />
                                                <ErrorMessage
                                                    className="d-inline-block ml-2 form-text text-danger small"
                                                    name={`contracts[${i}].validity.start_date`}
                                                />
                                                <ErrorMessage
                                                    className="d-inline-block ml-2 form-text text-danger small"
                                                    name={`contracts[${i}].validity.end_date`}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-10 col-lg-3">
                                            <label htmlFor="contract_number_id" className="form-label">
                                                Contratista
                                            </label>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="contract_number_id"
                                                aria-describedby="nombre del projecto"
                                                name={`contracts[${i}].contractor`}
                                                autoComplete="off"
                                                disabled={disabled}
                                                maxLength={20}
                                            />
                                            <ErrorMessage name={`contracts[${i}].contractor`} />
                                        </div>
                                        <div
                                            className="col-1"
                                            style={{ display: 'flex', alignItems: 'center', marginTop: '-30px' }}
                                        >
                                            <LinkButton
                                                name=""
                                                icon={<i className="fa fa-times" aria-hidden="true" />}
                                                onClick={() => {
                                                    const contracts_list = values.contracts?.filter((v, j) => j !== i);
                                                    setFieldValue('contracts', contracts_list, false);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}

                            {values.contracts?.length === 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={
                                                <span className="text-primary">
                                                    No hay contratos para mostrar.
                                                    <br />
                                                    Por favor agregue un cotrato.
                                                </span>
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </Card>
                    </Form>
                );
            }}
        </Formik>
    );
};

ProjectForm.defaultProps = {
    onSubmit: (/*v*/) => Promise.resolve(),
};
export default ProjectForm;
