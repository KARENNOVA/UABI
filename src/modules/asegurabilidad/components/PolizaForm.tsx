// import React from 'react';
import { Formik, Form, Field } from 'formik';
// import { actions } from "./../redux";
import { FC } from 'react';
import * as Yup from 'yup';
import ErrorMessage from '../../../utils/ui/error_messge';
import Select from '../../../utils/ui/select';
import Tooltip from 'antd/lib/tooltip';
import { LinkButton } from '../../../utils/ui/link';
import DocumentModal from './../../../utils/components/DocumentsModal/index';
import { swal_warning } from '../../../utils';
import moment from 'moment';

interface InsurabilityFormPros {
    policy?: any;
    realEstatesPolicy?: any;
    companies?: any;
    brokers?: any;
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    type_assurance?: 'Normal';
    innerRef?: any;
    onSubmit: (values, actions?) => Promise<any>;
    realEstates?: any;
}

const PolizaForm: FC<InsurabilityFormPros> = ({
    policy,
    realEstatesPolicy,
    companies,
    brokers,
    disabled,
    type,
    innerRef,
    onSubmit,
    realEstates
}) => {
    //console.log(realEstatesPolicy);

    let newrealEstates = [];
    newrealEstates = realEstates;
    // newrealEstates = realEstates.reduce((valor_anterior, valor_actual) => {
    //     const codigos = valor_actual.sap_id.split(',');
    //     const codes = codigos.filter((cod) => cod.charAt(cod.length - 1) === 'n');
    //     let obj_type = {};
    //     let obj_code = {};
    //     if (valor_actual.destination_type === 'PÚBLICO') {
    //         obj_type = {
    //             ...valor_actual,
    //         };
    //         valor_anterior.push(obj_type);
    //     }
    //     for (let i = 0; i < codes.length; i++) {
    //         if (valor_actual.destination_type !== 'PÚBLICO') {
    //             obj_code = {
    //                 ...valor_actual,
    //             };
    //             valor_anterior.push(obj_code);
    //         }
    //     }
    //     return valor_anterior;
    // }, []);
    // console.log(newrealEstates);

    const initialValues = {
        registry_numbers: realEstatesPolicy ? realEstatesPolicy.map((r) => `${r.registry_number} - ${r.name}`) : [],
        policy_number: "",
        policy_type: '',
        vigency_start: '',
        vigency_end: '',
        insurance_broker_id: '',
        insurance_value: '',
        type_assurance: 'NORMAL',
        insurance_companies: [
            {
                id: '',
                percentage_insured: 0,
            },
        ],
        insurance_document_id: '',
        insurance_document: {
            label: 'póliza',
            type: 11,
            pdf: null,
        },
        real_estates_id: realEstatesPolicy ? realEstatesPolicy.map((r) => r.id) : [],
        ...policy,
        ...(policy
            ? { insurance_broker_id: `${policy?.insurance_broker?.nit} - ${policy?.insurance_broker?.name}` }
            : {}), //TODO: cambiar nit por id
    };
    //console.log('valores iniciales',initialValues)
    if (initialValues.vigency_start) {
        const tmpDate = new Date(Number(initialValues.vigency_start));
        const tmpDate2 = new Date(Number(initialValues.vigency_end));
        const newDate = moment(tmpDate).format('YYYY-MM-DD');
        const newDate2 = moment(tmpDate2).format('YYYY-MM-DD');
        initialValues.vigency_start = newDate;
        initialValues.vigency_end = newDate2;
    }
    const schema = Yup.object().shape({
        real_estates_id: Yup.array().min(1, 'obligatorio'),
        policy_type: Yup.string().required('obligatorio'),
        vigency_start: Yup.string().required('obligatorio'),
        vigency_end: Yup.string().required('obligatorio'),
        insurance_broker_id: Yup.string().required('obligatorio'),
        insurance_value: Yup.number()
        .required('Campo obligatorio')
        .min(0, 'El minimo es 0')
        .max(99999999999999999999, 'El maximo 20 es caracteres'),
        insurance_companies: Yup.array().of(
            Yup.object().shape({
                id: Yup.string().required('obligatorio'),
                percentage_insured: Yup.number()
                .required('Campo obligatorio')
                .min(0, 'El minimo es 0')
                .max(100, 'El maximo 100 es caracteres'),

            })
        ),
        policy_number: Yup.number()
            .required('Campo obligatorio')
            .min(0, 'El minimo es 0')
            .max(9999999999, 'El maximo 10 es caracteres'),

        // .test({
        //     message: 'Revise los porcentajes',
        //     test: arr => {
        //         const count: number = arr.reduce((sum, company) => {
        //             console.log(sum, company);
        //             return 0
        //         }, 0) as number;
        //         console.log(count);
        //         return false
        //     }
        // })
        //type_assurance: Yup.string().required('obligatorio'),
        //id: Yup.string().required('obligatorio'),
    });

    const submit = (values, actions) => {
        console.log(values)
        const newDate = moment(values.vigency_start).format('YYYY/MM/DD');
        const newDate2 = moment(values.vigency_end).format('YYYY/MM/DD');
        const finalValues = {
            ...values,
            vigency_start: new Date(newDate).getTime(),
            vigency_end: new Date(newDate2).getTime(),
            insurance_broker_id: typeof values.insurance_broker_id === 'number' ? values.insurance_broker_id : values.insurance_broker?.id
        };

        let total = 0;
        Array.isArray(values.insurance_companies) &&
            finalValues.insurance_companies.map((valor) => (total = total + valor.percentage_insured));
        if (total > 100) {
            swal_warning.fire('Revise los porcentajes', '', 'error');
        } else {
            //console.log(finalValues);
            onSubmit(finalValues, actions).then(() => {
                actions.setSubmitting(false);
                actions.resetForm();
            });
        }
    };

    return (
        <Formik
            enableReinitialize
            onSubmit={submit}
            innerRef={innerRef}
            initialValues={initialValues}
            validationSchema={schema}
        >
            {({ setFieldValue, values, handleChange, isSubmitting }) => {
                // console.log(values.insurance_broker_id)
                const number_validate = (limit?: number) => (e) => {
                    e.preventDefault();
                    const regex = new RegExp(`^([1-9]+\\d*)|[0]${limit ? `{0,${limit}}` : '*'}$`);
                    if (regex.test(e.target.value.toString())) {
                        const a = Math.abs(parseInt(e.target.value))
                        e.target.value = a
                        handleChange(e);
                    }
                };
                return (
                    <Form>
                        <div className="row">
                            {type !== 'view' && (
                                <div className="form-group col-12 col-lg-6 col-md-6">
                                    <label htmlFor="real_estates_id_id" className="form-label">
                                        Matrícula
                                    </label>
                                    <Field
                                        component={Select}
                                        name="real_estates_id"
                                        id="real_estates_id_id"
                                        className="w-100"
                                        options={Array.isArray(newrealEstates) ? [
                                            { id: 'all', name: 'Todas las matriculas' },
                                            ...newrealEstates?.map((realestate) => ({
                                                id: realestate.id,
                                                name: `${realestate.registry_number} - ${realestate.name}`
                                            })),
                                        ]
                                            :
                                            []
                                        }
                                        mode="multiple"
                                        extra_on_change={(ids) => {
                                            if (ids.includes('all')) {
                                                const registryNumberRealEstates = realEstates.map((r) => {
                                                    return r.registry_number;
                                                });
                                                setFieldValue('real_estates_id', ['all'], false);
                                                setFieldValue('registry_numbers', registryNumberRealEstates, false);
                                            } else {
                                                const registryNumberRealEstates = ids.map((id) => {
                                                    const real_estate = realEstates.find((r) => r.id === id);
                                                    return real_estate?.registry_number || -1;
                                                });
                                                setFieldValue('registry_numbers', registryNumberRealEstates, false);
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="real_estates_id" />
                                </div>
                            )}
                            <div className={`col-12 col-md-6 col-lg-${type === 'view' ? 3 : 6}`}>
                                <label htmlFor="policy_type" className="form-label">
                                    Tipo de póliza
                                </label>
                                <Field
                                    as="select"
                                    id="policy_type"
                                    name="policy_type"
                                    className="w-100 form-select form-control"
                                    disabled={disabled}
                                >
                                    <option key="policy_type" value="" disabled>
                                        --Seleccione el tipo de póliza--
                                    </option>
                                    <option key="Seguro" value="Seguro">
                                        Seguro
                                    </option>
                                    <option key="Contables" value="Contables">
                                        Contables
                                    </option>
                                    <option key="De" value="De Crédito">
                                        De crédito
                                    </option>
                                </Field>
                                <span className="text-danger text-left d-block w-100 mt-1" style={{ height: '22px' }}>
                                    <ErrorMessage name="policy_type" />
                                </span>
                            </div>
                            {/* {type !== 'view' && (
                                <>
                                    <div></div>
                                    <div className="row"></div>
                                </>
                            )} */}
                            <div className="col-12 col-lg-6 col-md-6">
                                <label htmlFor="policy_number_id" className="form-label mt-3 mt-lg-0">
                                    Número de póliza
                                </label>
                                <Field
                                    type="number"
                                    id="policy_number_id"
                                    name="policy_number"
                                    placeholder="No. póliza"
                                    className="form-control"
                                    disabled={disabled}
                                />
                                <ErrorMessage name="policy_number" />
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="vigency_start" className="form-label mt-3 mt-lg-0">
                                    Fecha de inicio
                                </label>
                                <Field
                                    type="date"
                                    id="vigency_start"
                                    name="vigency_start"
                                    className="form-control"
                                    disabled={disabled}
                                    max={moment(new Date()).format("YYYY-MM-DD")}
                                />
                                <ErrorMessage name="vigency_start" />
                            </div>

                            <div className="col-12 col-lg-3 col-md-6">
                                <label htmlFor="vigency_end" className="form-label mt-3 mt-lg-0">
                                    Fecha final
                                </label>
                                <Field
                                    type="date"
                                    id="vigency_end"
                                    name="vigency_end"
                                    placeholder="Fecha Final"
                                    className="form-control"
                                    min={moment(values.vigency_start).format("YYYY-MM-DD")}
                                    // max={moment(new Date()).format("YYYY-MM-DD")}
                                    disabled={disabled}
                                />
                                <ErrorMessage name="vigency_end" />
                            </div>
                            <div className={`col-12 col-md-6 col-lg-${type === 'view' ? 3 : 6}`}>
                                <label htmlFor="insurance_broker_id_id" className="form-label">
                                    Corredor de seguros
                                </label>
                                <Field
                                    component={Select}
                                    id="insurance_broker_id_id"
                                    name="insurance_broker_id"
                                    placeholder="Selecciona una corredor de seguros"
                                    disabled={disabled}
                                    options={brokers?.map((broker) => {
                                        return {
                                        id: broker.id,
                                        name: `${broker.nit} - ${broker.name}`
                                        }
                                    })}
                                    showSearch // habilitar para buscarx
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <span className="text-danger text-left d-block w-100 mt-1" style={{ height: '22px' }}>
                                    <ErrorMessage name="insurance_broker_id" />
                                </span>
                            </div>
                            {type !== 'view' && (
                                <div className="col-12 col-lg-6 col-md-6">
                                    <label htmlFor="form-select" className="form-label">
                                        Adjuntar póliza
                                    </label>
                                    <Field
                                        name="insurance_document"
                                        component={DocumentModal}
                                        btn_label="Adjuntar"
                                        disables={disabled}
                                        onDelete={
                                            (/*values*/) => {
                                                setFieldValue('insurance_document_id', '', false);
                                            }
                                        }
                                    />
                                    <ErrorMessage name="insurance_document" />
                                </div>
                            )}
                        </div>

                        <div className="row">
                            <div className="col-12 col-lg-6 col-md-6">
                                <label htmlFor="rebuild_value" className="form-label">
                                    Valor de la póliza
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white border-end-0">$</span>
                                    </div>
                                    <Field
                                        name="insurance_value"
                                        id="insurance_value"
                                        type="number"
                                        className="form-control text-end"
                                        style={{ borderLeft: 'none' }}
                                        maxLength={20}
                                        disabled={disabled}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            const { value } = e.target;
                                            const regex = /^[0-9]{0,20}$/;
                                            if (regex.test(value.toString())) {
                                                handleChange(e);
                                            }
                                        }}
                                    />
                                    <span
                                        className="text-danger text-left d-block w-100 mt-1"
                                        style={{ height: '22px' }}
                                    >
                                        <ErrorMessage name="insurance_value" />
                                    </span>
                                </div>
                            </div>
                            {type !== 'view' && (
                                <div className="form-group col-12 col-lg-6 col-md-6">
                                    <label htmlFor="zone_id" className="form-label">
                                        Tipo de aseguramiento
                                        <Tooltip title="Lorem impsu texto descriptivo">
                                            <i className="fa fa-info-circle text-muted ms-2" style={{ fontSize: 14 }} />
                                        </Tooltip>
                                    </label>

                                    <div className="form-check-inline ">
                                        <label style={{ fontWeight: 400 }}>
                                            <Field
                                                disabled={disabled}
                                                name="type_assurance"
                                                id="type_assurance_id"
                                                type="radio"
                                                className="form-check-input"
                                                value="NORMAL"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    const insurance_companies_list = [
                                                        values.insurance_companies[0],
                                                    ] || [
                                                            {
                                                                id: '',
                                                                percentage_insured: '',
                                                            },
                                                        ];
                                                    setFieldValue(
                                                        'insurance_companies',
                                                        insurance_companies_list,
                                                        false
                                                    );
                                                }}
                                            />{' '}
                                            Normal
                                        </label>
                                    </div>
                                    <div className="form-check-inline ">
                                        <label style={{ fontWeight: 400 }}>
                                            <Field
                                                disabled={disabled}
                                                name="type_assurance"
                                                id="type_assurance_id"
                                                type="radio"
                                                className="form-check-input"
                                                value="COASEGURADA"
                                            />{' '}
                                            Coaseguramiento
                                        </label>
                                    </div>
                                    {values.type_assurance === 'COASEGURADA' && (
                                        <div className="form-check-inline" style={{ marginLeft: '75px' }}>
                                            <LinkButton
                                                onClick={() => {
                                                    const insurance_companies_list = [
                                                        ...values.insurance_companies,
                                                        {
                                                            id: '',
                                                            percentage_insured: '',
                                                        },
                                                    ];
                                                    setFieldValue(
                                                        'insurance_companies',
                                                        insurance_companies_list,
                                                        false
                                                    );
                                                }}
                                                name="Agregar compañía"
                                                icon={<i className="fa fa-plus-circle" aria-hidden="true" />}
                                            />
                                        </div>
                                    )}
                                    <ErrorMessage name="type_assurance" />
                                </div>
                            )}
                            {/* {Array.isArray(values.insurance_companies)  && console.log(values.insurance_companies?.map( company => company.join(", ")))} */}
                            {type === 'view' && (
                                <div className={`form-inline col-12 col-md-6 col-lg-6`}>
                                    <label htmlFor="companies" className="form-label">
                                        Compañías aseguradoras
                                    </label>
                                    <Field
                                        type="text"
                                        name="companies"
                                        id="companies"
                                        className="form-control"
                                        value={values.insurance_companies.map((a) => a.name).join(',  ')}
                                        style={{ borderLeft: 'none' }}
                                        disabled={disabled}
                                    />
                                    <ErrorMessage name="companies" />
                                </div>
                            )}
                        </div>
                        {type !== 'view' && (
                            <>

                                {Array.isArray(values.insurance_companies) &&
                                    values.insurance_companies?.map((item, i) => {
                                        return (
                                            <div className="row form-group" key={i}>
                                                <div className={`form-inline col-12 col-lg-6 col-md-6`}>
                                                    <label htmlFor={`id_${i}`} className="form-label">
                                                        Compañía aseguradora
                                                    </label>
                                                    <Field
                                                        component={Select}
                                                        id={`id_${i}`}
                                                        name={`insurance_companies[${i}].id`}
                                                        //className="w-100 form-select form-control"
                                                        placeholder="Selecciona una Compañía aseguradora"
                                                        disabled={disabled}
                                                        showSearch // habilitar para buscar
                                                        options={companies?.results?.map((company) => ({
                                                            id: company.id,
                                                            name: `${company.nit} - ${company.name}`,
                                                        }))}
                                                        filterOption={(input, option) => {
                                                            return (
                                                                option?.children
                                                                    ?.toLowerCase()
                                                                    .indexOf(input.toLowerCase()) >= 0
                                                            );
                                                        }}
                                                    />
                                                    {/* <option key="id" value="" disabled>
                                                        --Seleccione Compañía Aseguradora--
                                                    </option>
                                                    {companies?.results?.map(company =>
                                                        <option key={company?.id} value={company?.name}>{company?.name}</option>
                                                    )}
                                                </Field> */}
                                                    <ErrorMessage name={`insurance_companies[${i}].id`} />
                                                </div>

                                                <div className="col-11 col-lg-5 col-md-5 form-inline">
                                                    <label htmlFor={`percentage_insured_${i}`} className="form-label">
                                                        Porcentaje de aseguramiento
                                                    </label>
                                                    <div className="input-group">
                                                        <Field
                                                            disabled={disabled}
                                                            name={`insurance_companies[${i}].percentage_insured`}
                                                            id={`percentage_insured_${i}`}
                                                            className="form-control border-end-0"
                                                            min={0}
                                                            max={100}
                                                            type="number"
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                const { value } = e.target;
                                                                const regex = /^[0-9]{0,3}$/;
                                                                if (regex.test(value.toString())) {
                                                                    handleChange(e);
                                                                }
                                                            }}
                                                        />
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text bg-white border-start-0">
                                                                %
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <ErrorMessage
                                                        name={`insurance_companies[${i}].percentage_insured`}
                                                    />
                                                </div>

                                                <div
                                                    className="col-1 "
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                >
                                                    {i !== 0 && (
                                                        <LinkButton
                                                            name=""
                                                            icon={<i className="fa fa-times" aria-hidden="true" />}
                                                            onClick={() => {
                                                                const insurance_companies_list =
                                                                    values.insurance_companies.filter(
                                                                        (v, j) => j !== i
                                                                    );
                                                                setFieldValue(
                                                                    'insurance_companies',
                                                                    insurance_companies_list,
                                                                    false
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default PolizaForm;
