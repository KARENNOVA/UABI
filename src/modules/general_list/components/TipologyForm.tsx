import React, { FC, MutableRefObject } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormikProps, FormikValues } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../../utils/ui/error_messge';
import { Tipology } from '../redux/service';

interface TipologyFormPros {
    tipology?: Tipology;
    onSubmit?: (values: Tipology, form?) => Promise<any>;
    disabled?: boolean;
    innerRef?: MutableRefObject<FormikProps<FormikValues>>;
}

const TipologyForm: FC<TipologyFormPros> = ({ tipology, onSubmit, disabled, innerRef, }) => {
    const initial_values = {
        id: '',
        tipology: '',
        accounting_account: '',
        ...tipology,
    };

    const schema = Yup.object().shape({
        tipology: Yup.string().required('Campo obligatorio'),
        accounting_account: Yup.string().required('Campo obligatorio'),
    });

    const submit = (values, form) => {
        onSubmit(values, form)
            .then(() => {
                form.setSubmitting(false);
            })
            .catch(() => form.setSubmitting(false));
    };
    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initial_values} validationSchema={schema} innerRef={innerRef}>
            {({ /*values, isValid,*/ isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <div className="row">
                            {tipology && (
                                <div className="col-4">
                                    <label htmlFor="id_id" className="form-label">
                                        Código
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
                            <div className={`col-${tipology ? 4 : 6}`}>
                                <label htmlFor="tipology_id" className="form-label">
                                    Nombre de la Tipología
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="tipology_id"
                                    name="tipology"
                                    autoComplete="off"
                                    disabled={disabled}
                                    maxLength={100}
                                />
                                <ErrorMessage name="tipology" withCount max={100} />
                            </div>
                            <div className={`col-${tipology ? 4 : 6}`}>
                                <label htmlFor="accounting_account_id" className="form-label">
                                    Cuenta Contable
                                </label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="accounting_account"
                                    id="accounting_account_id"
                                    autoComplete="off"
                                    disabled={disabled}
                                    maxLength={20}
                                />
                                <ErrorMessage name="accounting_account" withCount max={20} />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default TipologyForm
