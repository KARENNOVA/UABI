import { Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { Card } from '../../../../../utils/ui'
import { ModalNotificar } from './../../ModalNotificar';
import { FormPrecontractualPublicUse } from './FormPrecontractualPublicUse';
import { FormUser } from './../FormUser';
import FormLider from '../FormLider';
import * as Yup from 'yup';
import { FormRiskAnalysis } from '../FormRiskAnalysis';
import moment from 'moment';
import actions from './../../../redux/actions';
import { useDispatch } from 'react-redux';
import { swal_success } from '../../../../../utils/index';

interface FormPros {
    innerRef?: any;
    realEstate?: any;
    onSubmit?: (values, form?, isFinish?: boolean) => Promise<any>;
    values_form?: any;
    precontractual?: any;
}

const GeneralFormPublicUse: FC<FormPros> = ({ onSubmit, innerRef, realEstate, values_form, precontractual }) => {

    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (precontractual) {
            setEdit(true);
        }
    }, [precontractual]);


    let initialValues = {
        environmental_risk: "",
        registration_date: moment(new Date()).format('YYYY-MM-DD'),
        contract_period: "",
        prediation_number: "",
        prediation_date: "",
        lockable_base: 10,
        business_type: "",
        boundaries: "",
        //solicitante
        applicant: "",

        //analisis de riegos
        regulatory_risk: {
            degree_occurrence: "MEDIO",
            impact_degree: "MEDIO",
            responsible: "Contratista",
            mitigation_mechanism: "Ejercer un control y vigilancia estrictos al contrato por parte del supervisor.",
        },
        operational_risk: {
            degree_occurrence: "MEDIO",
            impact_degree: "MEDIO",
            responsible: "Contratista",
            mitigation_mechanism: "Realizar visitas trimestrales al bien inmueble objeto del contrato y seguimiento mensual a los pagos de cánones, servicios públicos y administración cuando aplique, por parte del supervisor para realizar seguimiento y evaluación al desarrollo del objeto contractual",
        },
        //uso publico
        destination_realestate: "",
        contract_value: "",
        obligations: [],
        prohibitions: [],
        cadastral_value: "",

        //lider y personas a cargo
        leader: "",
        elaborated: "",
        revised: "",
        approved: "",

        //info del bi
        dependency: realEstate?.dependency?.dependency,
        secretary: realEstate?.cost_center?.subdependency,
        ...{
            ...precontractual,
            prediation_date: precontractual?.prediation_date ? moment(new Date(Number(precontractual?.prediation_date))).format('YYYY-MM-DD') : "",
            registration_date: precontractual?.registration_date ? moment(new Date(Number(precontractual?.registration_date))).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
            leader: precontractual?.leader ? {
                id: precontractual?.leader?.id || "",
                documentType: precontractual?.leader?.document_type || "",
                documentNumber: precontractual?.leader?.document_number || "",
                names: { firstName: precontractual?.leader?.first_name || '', lastName: precontractual?.leader?.last_name || '' },
                surnames: { firstSurname: precontractual?.leader?.first_surname || '', lastSurname: precontractual?.leader?.last_surname || '' },
                company_name: precontractual?.leader?.company_name || "",
                email: precontractual?.leader?.email || "",
                phoneNumber: precontractual?.leader?.phone_number || "",
                phoneNumber_ext: precontractual?.leader?.phone_number_ext || "",
                gender: precontractual?.leader?.gender || "",
                post: precontractual?.leader?.post || "",
                location_id: precontractual?.leader?.location_id || "",
            } : "",
            elaborated: precontractual?.elaborated  ? {
                id: precontractual?.elaborated?.id || "",
                documentType: precontractual?.elaborated?.document_type || "",
                documentNumber: precontractual?.elaborated?.document_number || "",
                names: { firstName: precontractual?.elaborated?.first_name || '', lastName: precontractual?.elaborated?.last_name || '' },
                surnames: { firstSurname: precontractual?.elaborated?.first_surname || '', lastSurname: precontractual?.elaborated?.last_surname || '' },
                company_name: precontractual?.elaborated?.company_name || "",
                email: precontractual?.elaborated?.email || "",
                phoneNumber: precontractual?.elaborated?.phone_number || "",
                phoneNumber_ext: precontractual?.elaborated?.phone_number_ext || "",
                gender: precontractual?.elaborated?.gender || "",
                post: precontractual?.elaborated?.post || "",
                location_id: precontractual?.elaborated?.location_id || "",
            } : "",
            revised: precontractual?.revised ? {
                id: precontractual?.revised?.id || "",
                documentType: precontractual?.revised?.document_type || "",
                documentNumber: precontractual?.revised?.document_number || "",
                names: { firstName: precontractual?.revised?.first_name || '', lastName: precontractual?.revised?.last_name || '' },
                surnames: { firstSurname: precontractual?.revised?.first_surname || '', lastSurname: precontractual?.revised?.last_surname || '' },
                company_name: precontractual?.revised?.company_name || "",
                email: precontractual?.revised?.email || "",
                phoneNumber: precontractual?.revised?.phone_number || "",
                phoneNumber_ext: precontractual?.revised?.phone_number_ext || "",
                gender: precontractual?.revised?.gender || "",
                post: precontractual?.revised?.post || "",
                location_id: precontractual?.revised?.location_id || "",
            } : "",
            approved: precontractual?.approved ? {
                id: precontractual?.approved?.id || "",
                documentType: precontractual?.approved?.document_type || "",
                documentNumber: precontractual?.approved?.document_number || "",
                names: { firstName: precontractual?.approved?.first_name || '', lastName: precontractual?.approved?.last_name || '' },
                surnames: { firstSurname: precontractual?.approved?.first_surname || '', lastSurname: precontractual?.approved?.last_surname || '' },
                company_name: precontractual?.approved?.company_name || "",
                email: precontractual?.approved?.email || "",
                phoneNumber: precontractual?.approved?.phone_number || "",
                phoneNumber_ext: precontractual?.approved?.phone_number_ext || "",
                gender: precontractual?.approved?.gender || "",
                post: precontractual?.approved?.post || "",
                location_id: precontractual?.approved?.location_id || "",
            } : "",
            applicant: precontractual?.applicant ? {
                id: precontractual?.applicant?.id || "",
                documentType: precontractual?.applicant?.document_type || "NIT",
                documentNumber: precontractual?.applicant?.document_number || "",
                names: { firstName: precontractual?.applicant?.first_name || '', lastName: precontractual?.applicant?.last_name || '' },
                surnames: { firstSurname: precontractual?.applicant?.first_surname || '', lastSurname: precontractual?.applicant?.last_surname || '' },
                company_name: precontractual?.applicant?.company_name || "",
                email: precontractual?.applicant?.email || "",
                phoneNumber: precontractual?.applicant?.phone_number || "",
                phoneNumber_ext: precontractual?.applicant?.phone_number_ext || "",
                gender: precontractual?.applicant?.gender || "",
                post: precontractual?.applicant?.post || "",
                location_id: precontractual?.applicant?.location_id || "",
                location: precontractual?.applicant?.location?.address || "",
            } : {
                documentType: "NIT",
            },
            representative: {
                id: precontractual?.representative?.id || "",
                documentType: precontractual?.representative?.document_type || "",
                documentNumber: precontractual?.representative?.document_number || "",
                names: { firstName: precontractual?.representative?.first_name || '', lastName: precontractual?.representative?.last_name || '' },
                surnames: { firstSurname: precontractual?.representative?.first_surname || '', lastSurname: precontractual?.representative?.last_surname || '' },
                company_name: precontractual?.representative?.company_name || "",
                email: precontractual?.representative?.email || "",
                phoneNumber: precontractual?.representative?.phone_number || "",
                phoneNumber_ext: precontractual?.representative?.phone_number_ext || "",
                gender: precontractual?.representative?.gender || "",
                post: precontractual?.representative?.post || "",
                location_id: precontractual?.representative?.location_id || "",
                location: precontractual?.representative?.location?.address || "",
            },


        },
        ...values_form,
    }
    const submit = (values, actions) => {
        values = {
            ...values,
            edit
        }
        onSubmit(values, actions).then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
        });
    };

    const schema = Yup.object().shape({
        cadastral_value: Yup.number()
            .required('obligatorio')
            .min(0, 'El minimo es 0')
            .max(99999999999999999999, 'maximo 20 caracteres'),
        prediation_number: Yup.number()
            .required('obligatorio')
            .min(0, 'El minimo es 0')
            .max(99999999999999999999, 'maximo 20 caracteres'),
        prediation_date: Yup.string().required('obligatorio'),
        destination_realestate: Yup.string().required('obligatorio'),
        contract_period: Yup.number()
            .required('obligatorio')
            .min(0, 'El minimo es 0')
            .max(999, 'maximo 3 caracteres'),
        contract_value: Yup.number()
            .required('obligatorio')
            .min(0, 'El minimo es 0')
            .max(99999999999999999999, 'maximo 20 caracteres'),
        environmental_risk: Yup.string().required('obligatorio'),
        lockable_base: Yup.number().required('obligatorio').min(10, 'El minimo es 10').max(100, 'El maximo es 100'),
        business_type: Yup.string().required('obligatorio'),
        registration_date: Yup.string().required('obligatorio'),
        boundaries: Yup.string().required('obligatorio'),

        applicant: Yup.object().required('obligatorio'),
        leader: Yup.object().required('obligatorio'),
        elaborated: Yup.object().required('obligatorio'),
        revised: Yup.object().required('obligatorio'),
        approved: Yup.object().required('obligatorio'),

    });
    return (
        <Formik enableReinitialize onSubmit={submit} innerRef={innerRef} initialValues={initialValues} validationSchema={schema} >
            {(formik) => {
                return <Form>
                    <Card
                        title="Estudio previo para Uso Público"
                        extra={
                            <>
                                <ModalNotificar />
                                {precontractual &&
                                    <button
                                        type="button"
                                        className='btn btn-primary'
                                        style={{ marginLeft: '5px' }}
                                        onClick={async () => {
                                            await dispatch(actions.inactivate_precontract(precontractual?.active_code));
                                            swal_success.fire({
                                                title: `estudio Previo inactivado`,
                                                text: "puede iniciar un nuevo proceso precontractual",
                                                icon: 'success',
                                                showConfirmButton: false,
                                                timer: 1500,
                                            });
                                        }}

                                    >
                                        Iniciar Nuevo Proceso
                                    </button>

                                }
                            </>
                        }
                    >
                        <FormPrecontractualPublicUse formik={formik} />
                    </Card>
                    <Card title="Información del solicitante">
                        <FormUser formik={formik} comodato={true} />
                    </Card>
                    <Card >
                        <FormRiskAnalysis formik={formik} />
                    </Card>

                    <Card>
                        <FormLider />
                    </Card>
                </Form>

            }}
        </Formik>
    );
};

export default GeneralFormPublicUse;
