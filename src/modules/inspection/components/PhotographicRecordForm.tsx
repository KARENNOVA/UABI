import React, { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import { Card } from '../../../utils/ui';
import DocumentModal from '../../../utils/components/DocumentsModal';
import ErrorMessage from '../../../utils/ui/error_messge';
import {IPhotograficregister, NewInspection} from "../custom_types";
import Image from "antd/lib/image";

interface PhotographicRecordFormProps {
    inspection: NewInspection;
    records: any[];
    photografic_register: IPhotograficregister;
    innerRef: any;
    onSubmit: (values) => void;
}

const PhotographicRecordForm: FC<PhotographicRecordFormProps> = ({ records,  photografic_register, innerRef, onSubmit }) => {
    return (
        <div className="container-fluid">
            <Formik
                innerRef={innerRef}
                enableReinitialize
                onSubmit={(values, form) => {
                    onSubmit(values);
                    form.setSubmitting(false);
                }}
                initialValues={{
                    facade: photografic_register.facade || null,
                    general: photografic_register.general || [],
                }}
            >
                {() => {
                    return (
                        <Form>
                            <Card title="Fotografias generales">
                                <div className="row">
                                    <div className="col-12 col-lg-6 col-md-6">
                                        <label htmlFor="form-select" className="form-label">
                                            Fachada
                                        </label>
                                        <Field
                                            name="documento1"
                                            component={DocumentModal}
                                            btn_label="Adjuntar"
                                            file_type="img"
                                        />
                                        <ErrorMessage name="documento1" />
                                    </div>
                                    <div className="col-12 col-lg-6 col-md-6">
                                        <label htmlFor="form-select" className="form-label">
                                            Generales
                                        </label>
                                        <Field
                                            name="documento2"
                                            component={DocumentModal}
                                            btn_label="Adjuntar"
                                            file_type="img"
                                        />
                                        <ErrorMessage name="documento2" />
                                    </div>
                                </div>
                            </Card>
                            <Card title="Evidencia de inspección física">
                                <div className="row">
                                    {records.map((record, i) => {
                                        let file_url = null;
                                        if (record.image?.img) {
                                            file_url = window.URL.createObjectURL(record.image.img);
                                            return <div className="col-3" key={`record_${i}`}>
                                                <label htmlFor="form-select" className="form-label">
                                                    {record.name}
                                                </label>
                                                <Image  src={file_url} />
                                            </div>
                                        }
                                        return null
                                    })}
                                </div>
                            </Card>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default PhotographicRecordForm;
