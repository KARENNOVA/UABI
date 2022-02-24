import React, { FC, Fragment } from 'react';
import { Field } from 'formik';
import { Card } from '../../../../utils/ui';
import ErrorMessage from '../../../../utils/ui/error_messge';
import DocumentModal from '../../../../utils/components/DocumentsModal';
import { LinkButton } from '../../../../utils/ui/link';
interface AcquisitionsFromProps {
    type?: 'view' | 'edit' | 'create';
    disabled?: boolean;
    formik?: any;
}
const SupportDocumentsForm: FC<AcquisitionsFromProps> = ({ type, disabled, formik }) => {
    disabled = disabled || type === 'view' || false;
    return (
        <Card
            title="Documentos soporte"
            extra={
                <LinkButton
                    name="Agregar nuevo"
                    avatar
                    iconText="+"
                    onClick={() => {
                        const supports_documents_list = [
                            ...formik.values.supports_documents,
                            {
                                label: 'Anexo',
                                type: 5,
                            },
                        ];
                        formik.setFieldValue('supports_documents', supports_documents_list, false);
                    }}
                />
            }
            actions={
                [
                    // <div className="d-flex flex-row-reverse px-3 py-1">
                    //     <button type="button" className="btn btn-primary">
                    //         Guardar {isSubmitting && (
                    //                     <i
                    //                         className="fa fa-spinner fa-spin"
                    //                         style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                    //                     />
                    //                 )}
                    //     </button>
                    // </div>,
                ]
            }
        >
            <div className="row">
                {formik.values?.supports_documents?.map((doc, i) => {
                    return (
                        <Fragment key={i}>
                            <div className="col-12 col-md-5 col-lg-5">
                                <label htmlFor="form-select" className="form-label">
                                    {doc?.label || ''}
                                </label>
                                <Field
                                    name={`supports_documents[${i}]`}
                                    component={DocumentModal}
                                    btn_label="Adjuntar"
                                    disabled={disabled}
                                    onDelete={(doc) => {
                                        if (doc.type === 6) {
                                            const list: any[] = formik.values.supports_documents;
                                            const supports_documents_list = list.filter((v, j) => i !== j);
                                            formik.setFieldValue('supports_documents', supports_documents_list, false);
                                        }
                                    }}

                                />

                                <ErrorMessage name="supports_documents" />
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </Card>
    );
};
export default SupportDocumentsForm;
