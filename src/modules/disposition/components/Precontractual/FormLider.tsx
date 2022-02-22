import { Field } from 'formik';
import { FC } from 'react';
import ErrorMessage from '../../../../utils/ui/error_messge'
import PersonaM from '../../../../utils/ui/PersonaM';

interface FormProps {
    lease?: boolean;
    formik?: any;
}

const FormLider: FC<FormProps> = ({ lease, formik }) => {

    return (
        <>
            <div className="div" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                Lider encargado
            </div>
            <hr />
            <div className="row">
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="dependence_id" className="form-label">
                        dependencia
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="dependence_id"
                        name="dependency"
                        placeholder=""
                        autoComplete="off"
                        maxLength={201}
                        disabled
                    />
                    <ErrorMessage name="dependency" />
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="secretary_id" className="form-label">
                        Secretaria
                    </label>
                    <Field
                        type="text"
                        className="form-control"
                        id="secretary_id"
                        name="secretary"
                        placeholder=""
                        autoComplete="off"
                        maxLength={201}
                        disabled
                    />
                    <ErrorMessage name="secretary" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="leader" className="form-label">
                        Información Lider<span className="text-danger">*</span>
                    </label>
                    <Field
                        component={PersonaM}
                        name="leader"
                        disposition={true}
                        withNit={true}
                    />
                    <ErrorMessage name="leader" />
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="elaborated" className="form-label">
                        Elaboró<span className="text-danger">*</span>
                    </label>
                    <Field
                        component={PersonaM}
                        name="elaborated"
                        disposition={true}
                    />
                    <ErrorMessage name="elaborated" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="revised" className="form-label">
                        Revisó<span className="text-danger">*</span>
                    </label>
                    <Field
                        component={PersonaM}
                        name="revised"
                        disposition={true}
                    />
                    <ErrorMessage name="revised" />
                </div>
                <div className="col-12 col-lg-6 col-md-6">
                    <label htmlFor="approved" className="form-label">
                        Aprobó<span className="text-danger">*</span>
                    </label>
                    <Field
                        component={PersonaM}
                        name="approved"
                        disposition={true}
                    />
                    <ErrorMessage name="approved" />
                </div>
            </div>
        </>
    );
};

export default FormLider;
