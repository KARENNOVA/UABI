import React, { useEffect, useRef } from 'react';
import { GeneralDataContract } from '../../components/Contractual/GeneralDataContract';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import actions from './../../redux/actions';
import { swal_success } from '../../../../utils';
import { actions as actionsReal } from './../../../acquisitions/redux';


interface IParams {
    id: string;
}

const EditContract = () => {
    const { id } = useParams<IParams>();
    // const id = 10;
    const history = useHistory();
    const dispatch = useDispatch();
    const form_ref = useRef<any>();

    const realEstate: any = useSelector((states: any) => states.acquisitions.realEstate.value);

    const precontractual: any = useSelector((state: any) => state.disposition.precontractual.value);
    const contract: any = useSelector((store: any) => store.disposition.contract.value);


    useEffect(() => {
        dispatch(actions.get_contract(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(Array.isArray(contract)) {
            dispatch(actionsReal.getRealEstate( contract[0]?.real_estates_id ));
        }
    }, [dispatch, contract]);

    useEffect(() => {
        if (realEstate?.active_code) {
            dispatch(actions.get_precontract(realEstate?.active_code));
        }
    }, [dispatch, realEstate])


    const _updateContract = async (contractForm) => {
        const data = {
            act_number: contractForm?.act_number,
            contract_decree: contractForm?.contract_decree,
            decree_date: contractForm?.decree_date,
            decree_number: contractForm?.decree_number,
            dispose_area: contractForm?.dispose_area,
            active_code: contractForm?.active_code,
            finish_date: contractForm?.finish_date,
            guarantee: contractForm?.guarantee,
            manager_sabi: contractForm?.manager_sabi,
            minutes_date: contractForm.minutes_date,
            object_contract: contractForm?.object_contract,
            secretary: {
                id: contractForm?.secretary?.id
            },
            subscription_date: contractForm?.subscription_date,
            type_contract: contractForm?.type_contract,
        }

        const res: any = await dispatch(actions.update_contract(id, data));
        if (res) {
            swal_success.fire({
                title: `Contrato Actualizado correctamente`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });

        }
        history.push(`/disposition/contract/${id}`);
    };


    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <GeneralDataContract
                                values_contract={contract}
                                innerRef={form_ref}
                                contractual={contract?.length > 0 ? contract[0] : null}
                                precontractual={precontractual}
                                realEstate={realEstate}
                                onSubmit={(values) => {
                                    return _updateContract(values);
                                }}

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
                        history.goBack();
                    }}
                >
                    Atrás
                </button>
                <div className="flex-fill" />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        form_ref.current.submitForm();
                    }}
                    disabled={form_ref.current?.isSubmitting}
                >
                    Guardar
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

export default EditContract;
