import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card } from '../../../../utils/ui';
import { FormContract } from './FormContract';
import { FC, useEffect, useState } from 'react';
import ViewPerson from './../Precontractual/ViewPerson';
import moment from 'moment';

interface FormPros {
    innerRef?: any;
    realEstate?: any;
    onSubmit?: (values, form?, isFinish?: boolean) => Promise<any>;
    values_contract?: any;
    dispositionType?: string;
    precontractual?: any;
    contractual?: any;
}


export const GeneralDataContract: FC<FormPros> = ({ onSubmit, innerRef, realEstate, values_contract, dispositionType, precontractual, contractual }) => {

    const [editContract, setEditContract] = useState(false)
    useEffect(() => {
        if (contractual) {
            setEditContract(true);
        }
    }, [contractual]);

    const initialValues = {

        // registration_date: precontractual?.registration_date ? moment(new Date(Number(precontractual?.registration_date))).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
        // appraisal_date: precontractual?.appraisal_date ? moment(new Date(Number(precontractual?.appraisal_date))).format('YYYY-MM-DD') : "",

        decree_number: "",
        // decree_date: "",
        act_number: "",
        minutes_date: "",
        contract_decree: "",
        manager_sabi: "",
        dispose_area: "",
        subscription_date: "",
        finish_date: "",
        object_contract: "",
        guarantee: `EL (LA) ARRENDATARIO(A) deberá otorgar garantía única de cumplimiento en favor de Entidades Estatales, de conformidad con lo establecido por el Decreto Nacional 1082 de 2015, la normativa vigente y demás normas que lo modifiquen, adicionen o sustituyan, la cual debe ser aceptada por EL ARRENDADOR y deberá cubrir los siguientes amparos: 1) Seguro de arrendamiento. Con el fin de garantizar las obligaciones que en razón de este contrato asume EL (LA) ARRENDATARIO(A), deberá otorgar una garantía correspondiente al cien por ciento (100%) del valor total del contrato, con una vigencia igual al plazo pactado en el contrato y cuatro (4) meses más. En caso de que sea Centros Comerciales Populares o Cerros Tutelares deberá otorgar garantía única de cumplimiento en favor de Entidades Estatales, la cual debe ser aceptada por EL ARRENDADOR y deberá cubrir los siguientes amparos: 1) Cumplimiento. Con el fin de garantizar las obligaciones que en razón de este contrato asume EL (LA) ARRENDATARIO(A), deberá otorgar una garantía correspondiente al treinta por ciento (30 %) del valor del contrato, con una vigencia igual al plazo pactado y cuatro (4) meses más, para dar cumplimiento a lo estipulado en la Ley 80 de 1993 y decretos reglamentarios. En caso de que sea vivienda urbana, no se exigirán garantías al ARRENDATARIO(A) para la ejecución del contrato de arrendamiento, teniendo en cuenta las condiciones sociales y económicas de los arrendatarios, a quienes les es muy difícil cumplir con los requisitos exigidos por las empresas aseguradoras para la expedición de las garantías.`,
        type_contract: dispositionType,
        secretary: "",
        // secretary: {
        //     name: "",
        //     id_number: "",
        // },
        ...values_contract,
        ...{
            ...contractual,
            decree_date: contractual?.decree_date ? moment(new Date(Number(contractual?.decree_date))).format('YYYY-MM-DD') : "",
            subscription_date: contractual?.subscription_date ? moment(new Date(Number(contractual?.subscription_date))).format('YYYY-MM-DD') : "",
            minutes_date: contractual?.minutes_date ? moment(new Date(Number(contractual?.minutes_date))).format('YYYY-MM-DD') : "",
            finish_date: contractual?.finish_date ? moment(new Date(Number(contractual?.finish_date))).format('YYYY-MM-DD') : "",
        }
    };


    // initialValues.decree_date = moment(new Date(Number(initialValues.decree_date))).format('YYYY-MM-DD');
    // initialValues.subscription_date = moment(new Date(Number(initialValues.subscription_date))).format('YYYY-MM-DD');
    // initialValues.minutes_date = moment(new Date(Number(initialValues.minutes_date))).format('YYYY-MM-DD');
    // initialValues.finish_date = moment(new Date(Number(initialValues.finish_date))).format('YYYY-MM-DD');


    const submit = (values, actions) => {
        values = {
            ...values,
            editContract
        }
        onSubmit(values, actions).then(() => {
            actions.setSubmitting(false);
            actions.resetForm();
        });
    };

    const schema = Yup.object().shape({
        decree_number: Yup.number().required('obligatorio'),
        decree_date: Yup.string().required('obligatorio'),
        act_number: Yup.number().required('obligatorio'),
        minutes_date: Yup.string().required('obligatorio'),
        contract_decree: Yup.string().required('obligatorio'),
        manager_sabi: Yup.string().required('obligatorio'),
        dispose_area: Yup.number().required('obligatorio'),
        subscription_date: Yup.string().required('obligatorio'),
        finish_date: Yup.string().required('obligatorio'),
        object_contract: Yup.string().required('obligatorio'),
        // secretary: Yup.string().required('obligatorio')
        // secretary: Yup.object({
        //     name: Yup.string().required('obligatorio'),
        //     id_number: Yup.number().required('obligatorio'),
        // })
    });
    return (
        <>
            <div className="col-3-12">
                <div className="content_box_table">
                    <div
                        className="title"
                        style={{ borderBottom: '1px solid #e2e4e4', color: '#2F2D2D', fontSize: '14px' }}
                    >
                        Informacion Previa del Contrato: 36000000000
                    </div>
                    <div className="table_content" style={{ margin: 7 }}>
                        <div className="detailForm" style={{ width: '100%' }}>
                            <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                <div className="col-3">
                                    <label htmlFor="">Tipo de Contrato</label>
                                    <div className="my-3">{precontractual?.type_disposition}</div>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Canon Mensual</label>
                                    <div className="my-3">{realEstate?.canyon_value}</div>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Valor del contrato</label>
                                    <div className="my-3">{precontractual?.contract_value}</div>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Fecha de registro estudio previo</label>
                                    <div className="my-3">{moment(new Date(Number(precontractual?.registration_date))).format('YYYY-MM-DD') ?? "-" }</div>
                                </div>

                            </div>
                            {precontractual?.type_disposition === "Arrendamiento" &&
                                <div className="row my-3" style={{ borderBottom: '1px solid #e2e4e4' }}>
                                    <div className="col-3">
                                        <label htmlFor="">Valor de Administración</label>
                                        <div className="my-3">{precontractual?.administration_value || "-"}</div>
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="">Valor de Vigilancia</label>
                                        <div className="my-3">{precontractual?.vigilance_value || "-"}</div>
                                    </div>
                                    <div className="col-3">
                                        <label htmlFor="">Servicio Público</label>
                                        <div className="my-3">{precontractual?.public_service || "-"}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Formik enableReinitialize onSubmit={submit} innerRef={innerRef} initialValues={initialValues} validationSchema={schema} >
                {(formik) => {
                    return (
                        <Form>
                            <Card title={`Informacion Contrato de ${dispositionType !== "Comodato" && dispositionType !== "Arrendamiento" ? "" : dispositionType}`}>
                                <FormContract
                                    formik={formik}
                                    realEstate={realEstate}
                                />
                            </Card>
                        </Form>
                    );
                }}
            </Formik>
            <ViewPerson title={`Información del ${dispositionType === "Arrendamiento" ? "Arrendador" : dispositionType === "Comodato" ? "Comodante" : ""}`}
                person={precontractual?.leader}
            />
            <ViewPerson title={`Información del ${dispositionType === "Arrendamiento" ? "Arrendatario" : dispositionType === "Comodato" ? "Comodatario" : ""}`}
                person={precontractual?.applicant}
            />
            {precontractual?.representative?.document_number &&
                <ViewPerson title='Informacion del Representante Legal'
                    person={precontractual?.representative}
                />
            }

        </>
    );
};
