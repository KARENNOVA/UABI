import React, { FC, useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import { Card } from '../../../utils/ui';
import ErrorMessage from '../../../utils/ui/error_messge';
import { PDFViewer } from '@react-pdf/renderer';
import InpectionDoc from './InpectionDoc';
import { TemplateContext } from '../../../utils/components/template/template_context';

interface ReportProps {
    disabled?: boolean;
    obs?: string;
    innerRef: any;
    onSubmit: (values) => void;
    data?: any;
    real_estate: any;
    user: any;
}
const Report: FC<ReportProps> = ({ disabled, obs, innerRef, onSubmit, data, real_estate, user }) => {
    const context = useContext(TemplateContext);
    return (
        <div className="container-fluid">
            <Card
                title="Vista previa informe de inspección"
                className={`${(context.device === "lg" ) && "h-100" }`}
                style={{ margin: 0 }}
                bodyStyle={{ height: 'calc(100% - 60px)' }}
            >
                <div className="row h-100">
                    <div className="col-12 col-lg-4 col-md-4">
                        <Formik
                            innerRef={innerRef}
                            enableReinitialize
                            onSubmit={(values, form) => {
                                onSubmit(values);
                                form.setSubmitting(false);
                            }}
                            initialValues={{
                                is_special_case: false,
                                special_actions: obs || '',
                                finish: false,
                            }}
                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <div className="row">
                                            <div className="col">
                                                <label>
                                                    <Field type="checkbox" name="is_special_case" className="me-2" />
                                                    Es un caso especial
                                                </label>
                                                <ErrorMessage name="is_special_case" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="contractual_id" className="form-label">
                                                    Acciones especiales según los hallazgos
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    className="form-control"
                                                    id="contractual_id"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Observaciones"
                                                    name="special_actions"
                                                    disabled={disabled}
                                                    autoComplete="off"
                                                    maxLength={250}
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        const { value } = e.target;
                                                        const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                                                        if (regex.test(value.toString())) {
                                                            formik.handleChange(e);
                                                        }
                                                    }}
                                                />
                                                <ErrorMessage name="special_actions" withCount max={250} />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        formik.setFieldValue('finish', false, false);
                                                        formik.submitForm();
                                                    }}
                                                >
                                                    Recargar vista previa
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                    <div className="col-12 col-lg-8 col-md-8 h-100">
                        <PDFViewer
                            className="w-100"
                            showToolbar={false}
                            style={{
                                height: '100%',
                                width: '100%',
                                border: '1px solid #525659',
                                backgroundColor: '#525659',
                            }}
                        >
                            <InpectionDoc data={data} real_estate={real_estate} user={user} innerRef={innerRef} />
                        </PDFViewer>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Report;
