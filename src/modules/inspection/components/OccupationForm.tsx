import { Field, Form, Formik } from 'formik';
import { FC, useContext } from 'react';
import { TemplateContext } from '../../../utils/components/template/template_context';
import ErrorMessage from '../../../utils/ui/error_messge';
import { IOccupation } from "../custom_types";

interface OccupationFormPros {
    disabled?: boolean;
    type?: 'view' | 'create' | 'edit';
    old?: IOccupation;
    new_?: IOccupation;
    innerRef: any;
    onSubmit: (values) => void;
}
const OccupationForm: FC<OccupationFormPros> = ({ disabled, old, new_, innerRef, onSubmit }) => {
    const context = useContext(TemplateContext);
    const is_clear = new_.use === '' && new_.tenure === '' && new_.ownership === '' && new_.contractual === '';
    const initialValues = {
        old: {
            tenure: '',
            use: '',
            ownership: '',
            contractual: '',
            ...old,
        },
        now: {
            tenure: '',
            use: '',
            ownership: '',
            contractual: '',
            ...(!is_clear ? new_ : old)
        },
    };
    const submit = (values, actions) => {
        onSubmit(values.now);
        actions.setSubmitting(false);
    };
    return (
        <Formik enableReinitialize onSubmit={submit} initialValues={initialValues} innerRef={innerRef}>
            {() => {
                return (
                    <Form>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="tenure_id" className="form-label">
                                    {(context.device === "lg" || context.device === "md") && "Estado de la tenencia"}
                                    {context.device === "sm" && "tenencia"}

                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="tenure_id"
                                    placeholder="Estado actual de la tenencia del bien Inmueble"
                                    name="old.tenure"
                                    disabled
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="old.tenure" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="tenure_id" className="form-label">
                                    {(context.device === "lg" || context.device === "md") && "Estado actual de la tenencia"}
                                    {context.device === "sm" && "tenencia actual"}

                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="tenure_id"
                                    placeholder="Estado actual de la tenencia del bien Inmueble"
                                    name="now.tenure"
                                    disabled={disabled}
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="now.tenure" withCount max={250} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="use_id" className="form-label">
                                    Estado del uso
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="use_id"
                                    aria-describedby="emailHelp"
                                    placeholder="Estado actual del uso del bien inmueble"
                                    name="old.use"
                                    disabled
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="old.use" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="use_id" className="form-label">
                                    {(context.device === "lg" || context.device === "md") && "Estado actual del uso"}
                                    {context.device === "sm" && "Estado uso actual"}
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="use_id"
                                    aria-describedby="emailHelp"
                                    placeholder="Estado actual del uso del bien inmueble"
                                    name="now.use"
                                    disabled={disabled}
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="now.use" withCount max={250} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="ownership_id" className="form-label">
                                    {(context.device === "lg" || context.device === "md") && "Estado de titularidad"}
                                    {context.device === "sm" && "titularidad"}

                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="ownership_id"
                                    aria-describedby="emailHelp"
                                    placeholder="Estado de titularidad del bien inmueble"
                                    name="old.ownership"
                                    disabled
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="old.ownership" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="ownership_id" className="form-label">
                                    {(context.device === "lg" || context.device === "md") && "Estado actual de titularidad"}
                                    {context.device === "sm" && "titularidad actual"}
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="ownership_id"
                                    aria-describedby="emailHelp"
                                    placeholder="Estado de titularidad del bien inmueble"
                                    name="now.ownership"
                                    disabled={disabled}
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="now.ownership" withCount max={250} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="contractual_id" className="form-label">
                                    {(context.device === "lg" || context.device === "md") && "Estado contractual"}
                                    {context.device === "sm" && "contractual"}
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="contractual_id"
                                    aria-describedby="emailHelp"
                                    placeholder="Estado contractual del bien inmueble"
                                    name="old.contractual"
                                    disabled
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="old.contractual" />
                            </div>
                            <div className="col-6">
                                <label htmlFor="contractual_id" className="form-label">
                                    {(context.device === "lg" || context.device === "md") && "Estado contractual actual"}
                                    {context.device === "sm" && "contractual actual"}
                                </label>
                                <Field
                                    as="textarea"
                                    className="form-control"
                                    id="contractual_id"
                                    aria-describedby="emailHelp"
                                    placeholder="Estado contractual del bien inmueble"
                                    name="now.contractual"
                                    disabled={disabled}
                                    autoComplete="off"
                                    maxLength={250}
                                />
                                <ErrorMessage name="now.contractual" withCount max={250} />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default OccupationForm;
