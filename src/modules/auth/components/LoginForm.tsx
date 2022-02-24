import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import ErrorMessage from '../../../utils/ui/error_messge';
import Link from '../../../utils/ui/link';
import Alert from 'antd/lib/alert';

interface IloginFormPros {
    onSubmit: (values, actions?) => any;
    disabled?: boolean;
    alert?: string;
}
const LoginForm: FC<IloginFormPros> = ({ onSubmit, disabled, alert }) => {
    const passwordType = ['password', 'text'];
    const [type, setType] = useState(0);
    const initialValues = {
        user: process.env.REACT_APP_USER && process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_USER : '',
        password:
            process.env.REACT_APP_PASSWORD && process.env.NODE_ENV !== 'production'
                ? process.env.REACT_APP_PASSWORD
                : '',
        remember: false,
    };

    const submit = (values, actions) => {
        actions.setSubmitting(true);
        onSubmit(values, actions)
            .then(() => {
                actions.setSubmitting(false);
                actions.resetForm();
            })
            .catch(() => {
                actions.setSubmitting(false);
            });
    };

    const schema = Yup.object().shape({
        user: Yup.string().required('obligatorio'),
        password: Yup.string().required('obligatorio'),
    });

    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initialValues} validationSchema={schema}>
            {({ isSubmitting }) => {
                return (
                    <Form>
                        <div className="container-inputs-login usuario-item-login">
                            <label htmlFor="user_id" className="form-label">
                                Número de Identificación
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="user_id"
                                name="user"
                                autoComplete="on"
                                disabled={disabled}
                            />
                            <ErrorMessage name="user" />
                        </div>
                        <div className="container-inputs-login">
                            <label htmlFor="password_id" className="form-label">
                                Digite su Contraseña
                            </label>
                            <div className="input-group mb-3">
                                <Field
                                    type={passwordType[type]}
                                    className="form-control border-end-0"
                                    id="password_id"
                                    name="password"
                                    autoComplete="on"
                                    disabled={disabled}
                                />
                                <span
                                    className="input-group-text bg-white border-start-0"
                                    onClick={() => {
                                        if (type === 0) {
                                            setType(1);
                                        } else {
                                            setType(0);
                                        }
                                    }}
                                >
                                    {type === 0 && <span style={{ color: '#1FAEEF' }}>VER</span>}
                                    {type === 1 && <span style={{ color: '#1FAEEF' }}>OCULTAR</span>}
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label className="d-flex align-items-center fw-normal">
                                    <Field type="checkbox" name="remember" value="remember-me" />
                                    <span className="d-inline-block ms-1">Recordar datos de acceso</span>
                                </label>
                            </div>
                        </div>
                        {alert && (
                            <div className="row">
                                <div className="col-12">
                                    <Alert
                                        message=""
                                        description={alert}
                                        type="error"
                                        closable
                                        style={{ fontSize: 13 }}
                                    />
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <div className="col ">
                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    className="btn btn-outline-primary my-3"*/}
                                {/*    onClick={() => (window.location.href = 'http://localhost:3000/auth/signup')}*/}
                                {/*>*/}
                                {/*    Registrarme*/}
                                {/*</button>*/}
                            </div>
                            <div className="col text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary my-3"
                                    disabled={disabled || isSubmitting}
                                >
                                    Ingresar
                                    {isSubmitting && (
                                        <i
                                            className="fa fa-spinner fa-spin"
                                            style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

LoginForm.defaultProps = {
    disabled: false,
};

export default LoginForm;
