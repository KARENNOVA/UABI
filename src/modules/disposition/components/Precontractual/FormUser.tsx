import { Field } from 'formik';
import ErrorMessage from '../../../../utils/ui/error_messge';
import { FC } from 'react';
import PersonaM from '../../../../utils/ui/PersonaM';

interface FormProps {
    formik: any;
    comodato?: boolean;
    lease?: boolean;

}
export const FormUser: FC<FormProps> = ({ formik, comodato, lease }) => {

    return (
        <>
            <div className="row">
                <div className={`col-12 col-lg-6 col-md-6`}>
                    <label htmlFor="applicant" className="form-label">
                        Información del solicitante<span className="text-danger">*</span>
                    </label>
                    <Field component={PersonaM} id="applicant_id" name="applicant" withNit={true} disposition={true} />
                    {/* <Field
                        component={Index}
                        name="applicant"
                    /> */}
                    <ErrorMessage name="applicant" />
                </div>

                {/* {(formik.values.applicant.document_type === "NIT" || formik.values.applicant.documentNumber === "NIT") && */}
                    <div className="col-12 col-lg-6 col-md-6">
                        <label htmlFor="representative" className="form-label">
                            Información del representante<span className="text-danger">*</span>
                        </label>
                        <Field
                            component={PersonaM}
                            name="representative"
                        />
                        <ErrorMessage name="representative" />
                    </div>
                {/* } */}
            </div>
        </>
    );
};
