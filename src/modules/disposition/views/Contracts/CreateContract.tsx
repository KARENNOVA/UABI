import { FC, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { GeneralDataContract } from './../../components/Contractual/GeneralDataContract';

interface FormPros {
    dispositionType?: string;
    realEstate?: any;
    values_contract?: any;
    precontractual?: any;
    contractual?: any;
}

const CreateContract: FC<FormPros> = ({ dispositionType, realEstate, values_contract, precontractual, contractual }) => {
    console.log(contractual)
    const form_ref = useRef<any>();
    const history = useHistory();
    const submit_contract = async (values_contract) => {
        console.log("vaules contrato", values_contract)
        //TODO: descomentar notificacion contratos
        // await create_notification({
        //     subject: 'Creación de un Contrato',
        //     description: `se ha creado un contrato de ${tipo_contrato} con número ${numero_de_contrato} y fecha de terminación ${fecha_terminacion}`,
        //     action: `/disposition/contract/${id}/`,
        //     priority: 2,
        //     toRole: "5"
        // });
        if (values_contract.type_contract === "Comodato") {
            history.push({ pathname: "/document/comodato/contract", state: { values_contract, realEstate, dispositionType } })

        } else if (values_contract.type_contract === "Arrendamiento") {
            history.push({ pathname: "/document/lease/contract", state: { values_contract, realEstate, dispositionType } })
        }
    }
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <GeneralDataContract
                                innerRef={form_ref}
                                onSubmit={submit_contract}
                                dispositionType={dispositionType}
                                realEstate={realEstate}
                                values_contract={values_contract}
                                precontractual={precontractual}
                                contractual={contractual}


                            />
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
                        //history.push({ pathname: `/disposition/edit/${realEstate.id}`, state: { dispositionType } })
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
                >
                    Vista Previa
                </button>
            </div>
        </div>
    );
};

export default CreateContract;
