import Modal from 'antd/lib/modal/Modal';
import { Formik, Form, Field } from 'formik';
import React, { FC, ReactElement, useContext, useRef } from 'react';
import ErrorMessage from '../../../utils/ui/error_messge';
import { TemplateContext } from './../../../utils/components/template/template_context';

interface PercentageModalProps {
    open?: boolean;
    toggle?: () => void;
}

const PercentageModal: FC<PercentageModalProps> = ({
    open,
    toggle,
}): ReactElement => {
    const form_ref = useRef<any>();
    const context = useContext(TemplateContext);
    const submit = (values, actions) => {
        toggle();


        // onSubmit(values, actions).then(() => {
        //     actions.setSubmitting(false);
        //     actions.resetForm();
        // });
    };

    const initialValues = {
        investment_percentage: "",
        social_investment_percentage: "",
    };

    return (
        <Modal
            centered
            title="Aplicar Porcentaje"
            visible={open}
            onCancel={toggle}
            footer={
                <>
                    <button
                        type="submit"
                        className="btn btn-outline-primary "
                        key="1"
                        disabled={false}
                        style={{ marginRight: '20px' }}
                        onClick={() => {
                            // close();

                        }}
                    >
                        salir
                    </button>
                    <button
                        type="submit"
                        className="btn btn-outline-primary "
                        key="2"
                        // disabled={form_ref.current?.isSubmitting}
                        onClick={() => {
                            form_ref.current.submitForm();
                        }}
                    >
                        Aplicar
                    </button>

                </>

            }
        >

            <Formik
                enableReinitialize
                onSubmit={submit}
                innerRef={form_ref}
                initialValues={initialValues}
            // validationSchema={schema}
            >
                {({ setFieldValue, values, handleChange, isSubmitting }) => {
                    return (
                        <Form>
                            {(context.canon_type === "inversion" || context.canon_type === null) &&
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="investment_percentage_id" className="form-label">
                                            Porcentaje Canon de Inversión <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <Field
                                                name="investment_percentage"
                                                id="investment_percentage_id"
                                                className="form-control border-end-0"
                                                min={0}
                                                max={100}
                                                type="number"
                                            />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white border-start-0">%</span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="investment_percentage" />
                                    </div>
                                </div>
                            }

                            {(context.canon_type === "inversion_social" || context.canon_type === null) &&


                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="social_investment_percentage_id" className="form-label">
                                            Porcentaje Canon de Inversión Social <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <Field
                                                name="social_investment_percentage"
                                                id="social_investment_percentage_id"
                                                className="form-control border-end-0"
                                                min={0}
                                                max={100}
                                                type="number"
                                            />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white border-start-0">%</span>
                                            </div>
                                        </div>
                                        <ErrorMessage name="social_investment_percentage" />
                                    </div>
                                </div>
                            }
                        </Form>
                    );
                }}
            </Formik>


        </Modal>
    );
};

export default PercentageModal;
