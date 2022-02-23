import { FC, useRef } from 'react'
import GeneralFormPublicUse from '../../components/Precontractual/PublicUse/GeneralFormPublicUse';
import { GeneralFormComodato } from './../../components/Precontractual/comodato/GeneralFormComodato';
import { GeneralFormLease } from './../../components/Precontractual/Lease/GeneralFormLease';
import { useHistory } from 'react-router-dom';

interface FormPros {
    dispositionType?: string;
    realEstate?: any;
    values_form?: any;
    stage?: string;
    precontractual?: any
}

const CreatePrecontractual: FC<FormPros> = ({ dispositionType, realEstate, values_form, stage, precontractual }) => {
    const form_ref = useRef<any>();
    const history = useHistory();
    const on_submit_lease = async (values) => {
        history.push({ pathname: "/document/lease/", state: { values, realEstate, dispositionType } })
    }

    const on_submit_comodato = async (values) => {
        history.push({ pathname: "/document/comodato/", state: { values, realEstate, dispositionType } })
    }

    const on_submit_publicuse = async (values) => {
        console.log('enviar valor', values)
        history.push({ pathname: "/document/use-public/", state: { values, realEstate, dispositionType } })
    }

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            {dispositionType === 'Comodato' && (
                                <GeneralFormComodato
                                    realEstate={realEstate}
                                    innerRef={form_ref}
                                    onSubmit={on_submit_comodato}
                                    values_form={values_form}
                                    precontractual={precontractual?.type_disposition === "Comodato" ? precontractual : null }

                                />
                            )}
                            {dispositionType === 'Arrendamiento' && (
                                <GeneralFormLease
                                    realEstate={realEstate}
                                    innerRef={form_ref}
                                    onSubmit={on_submit_lease}
                                    values_form={values_form}
                                    precontractual={precontractual?.type_disposition === "Arrendamiento" ? precontractual : null }
                                />
                            )}
                            {(dispositionType !== "Arrendamiento" && dispositionType !== "Comodato") &&
                                <GeneralFormPublicUse
                                    realEstate={realEstate}
                                    innerRef={form_ref}
                                    onSubmit={on_submit_publicuse}
                                    values_form={values_form}
                                    precontractual={precontractual?.type_disposition === "Publico" ? precontractual : null }
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.push({ pathname: `/disposition/edit/${realEstate.id}`, state: { dispositionType } })
                    }}
                >
                    Atrás
                </button>
                <div className="flex-fill" />
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        form_ref.current.submitForm();
                    }}
                    disabled={form_ref.current?.isSubmitting}
                >
                    Vista Previa
                    {form_ref.current?.isSubmitting && (
                        <i
                            className="fa fa-spinner fa-spin"
                            style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                        />
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreatePrecontractual;
