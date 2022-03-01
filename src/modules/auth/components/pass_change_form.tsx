import React, { FC, Fragment, useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { object, string, ref } from 'yup';
import { PasswordResetBody } from '../custom_types';
import { useSelector } from 'react-redux';
interface OwnProps {
    change_password: (pass: PasswordResetBody) => Promise<any>;
    onOk?: (data?) => void;
    SuccessButtons?: any;
    code?: string;
}

/**
 * Form component for change password
 * @param {(pass: PasswordResetBody) => Promise<any>;} change_password function service for change password
 * @param onOk
 * @param onOk
 * @param SuccessButtons
 * @param code
 * @param onOk
 * @param SuccessButtons
 * @param code
 * @param {React.ReactChildren} children
 * @param SuccessButtons
 * @param code
 */
export const PassChangeForm: FC<OwnProps> = ({ change_password, onOk, children, SuccessButtons, code }) => {
    const user = useSelector((store: any) => store.auth.user);
    const conditions = [
        'debe contener almenos 1 numero',
        'debe contener almenos 1 caracter especial',
        'minimo 8 caracteres',
    ];
    const schema = object({
        password: string()
            .matches(/(?=.*[0-9])/, conditions[0])
            .matches(/(?=.*[@$!%*?&,.#])/, conditions[1])
            .min(8, conditions[2]),
        re_password: string().oneOf([ref('password'), null], 'Passwords must match'),
    });
    const [sent_success, set_send_success] = useState<boolean>(false);
    const onSend = (values, formik) => {
        set_send_success(false);
        change_password({ password: values.password, ...(code ? { code } : {}) })
            .then((data) => {
                set_send_success(true);
                formik.setSubmitting(false);
                onOk && onOk(data);
            })
            .catch(() => {
                formik.setSubmitting(false);
            });
    };
    return (
        <div style={{ width: '400px' }}>
            <h3 className="mt-4">Cambiar Contraseña</h3>
            <Formik
                enableReinitialize
                onSubmit={onSend}
                initialValues={{ password: '', re_password: '' }}
                validationSchema={schema}
            >
                {(formik) => (
                    <Form>
                        {!sent_success && (
                            <Fragment>
                                <div className="text-left">
                                    {!user.isFirstLoggin &&
                                        <div className="form-group  mt-4 text-left">
                                            <label>Contraseña anterior</label>
                                            <Field type="password" className="form-control" name="lastPassword" />
                                            <ErrorMessage
                                                name="lastPassword"
                                                component="span"
                                                className="text-danger text-left d-block w-100 mt-1"
                                            />
                                        </div>

                                    }
                                    <div className="form-group mt-4 text-left">
                                        <label>Contraseña nueva</label>
                                        <Field type="password" className="form-control" name="password" />
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="text-danger text-left d-block w-100 mt-1"
                                        />
                                        <span style={{ fontSize: '.89em', opacity: '0.6' }}>
                                            El formato para la contraseña es el siguiente:
                                            <ul style={{ opacity: '0.6' }}>
                                                {conditions.map((c, i) => (
                                                    <li key={`conditions_${i}`}>{c}</li>
                                                ))}
                                            </ul>
                                        </span>
                                    </div>
                                    <div className="form-group  mt-4 text-left">
                                        <label>Contraseña nueva (repetir)</label>
                                        <Field type="password" className="form-control" name="re_password" />
                                        <ErrorMessage
                                            name="re_password"
                                            component="span"
                                            className="text-danger text-left d-block w-100 mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="controls mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={formik.isSubmitting || !formik.isValid}
                                    >
                                        Guardar
                                        {formik.isSubmitting && (
                                            <i
                                                className="fa fa-spinner fa-spin"
                                                style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </Fragment>
                        )}
                        {sent_success && (
                            <Fragment>
                                <p>
                                    Se cambio con exito la contraseña <i className="fa fa-check-circle text-success" />
                                </p>
                                <div className="controls mt-4">
                                    {SuccessButtons && (
                                        <SuccessButtons
                                            onClose={() => {
                                                formik.resetForm();
                                                set_send_success(false);
                                            }}
                                        />
                                    )}
                                </div>
                            </Fragment>
                        )}
                    </Form>
                )}
            </Formik>
            {children}
        </div>
    );
};

export default PassChangeForm;
