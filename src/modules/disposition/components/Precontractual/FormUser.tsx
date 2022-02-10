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
                <div className={formik.values.applicant.document_type === "NIT" ? `col-6` : `col`}>
                    <label htmlFor="applicant" className="form-label">
                        Información Del Solicitante<span className="text-danger">*</span>
                    </label>
                    <Field component={PersonaM} id="applicant_id" name="applicant" withNit={true} disposition={true} />
                    {/* <Field
                        component={Index}
                        name="applicant"
                    /> */}
                    <ErrorMessage name="applicant" />
                </div>
                {console.log(formik.values)}
                {formik.values.applicant.document_type === "NIT" &&
                    <div className="col-6">
                        <label htmlFor="representative" className="form-label">
                            Información Representante<span className="text-danger">*</span>
                        </label>
                        <Field
                            component={PersonaM}
                            name="representative"
                        />
                        <ErrorMessage name="representative" />
                    </div>
                }
            </div>
        </>
    );
};
