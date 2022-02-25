import { useEffect, useState } from 'react';
import { Card } from '../../../utils/ui';
import { FormDisposition } from '../components/FormDisposition';
import { FormTypeDisposition } from '../components/FormTypeDisposition';
import { useHistory, useParams } from 'react-router-dom';
import { ModalNotificar } from '../components/ModalNotificar';
import { useDispatch, useSelector } from 'react-redux';
import { actions as realActions } from '../../acquisitions/redux';
// import { TableContract } from '../components/Contractual/TableContract';
import actions from '../redux/actions';
import { TableContract } from '../components/Contractual/TableContract';


interface IProps {
    id: string;
}
export const EditDisposition = () => {
    const { id } = useParams<IProps>();
    const dispatch = useDispatch();
    const history = useHistory();
    const realEstate: any = useSelector((states: any) => states.acquisitions.realEstate.value);
    const [dispositionType, setDispositionType] = useState('');
    const precontractual: any = useSelector((state: any) => state.disposition.precontractual.value);
    const contracts: any = useSelector((state: any) => state.disposition.contracts.value);
    let contractual: any = useSelector((state: any) =>  state.disposition.contracts.value);

    useEffect(() => {
        dispatch(realActions.getRealEstate(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (realEstate?.active_code) {
            dispatch(actions.get_precontract(realEstate?.active_code));
        }
    }, [dispatch, realEstate])

    useEffect(() => {
        if (realEstate) {
            dispatch(actions.get_contracts_realestates(realEstate?.active_code));
        }
    }, [dispatch, realEstate])

    useEffect(() => {
        if (realEstate) {
        dispatch(actions.get_contract_realestate(realEstate?.active_code, 1));
        }
    }, [dispatch, realEstate])


    const typeDisposition = (value) => {
        setDispositionType(value);
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <Card title="Tipo disposición" extra={
                                <ModalNotificar
                                action={`/disposition/edit/${realEstate?.id}/`}/> }>
                                <FormTypeDisposition
                                    realEstate={realEstate}
                                    onTypeDispositionChange={typeDisposition}
                                    precontractual={precontractual}
                                    dispositionType={dispositionType}
                                />
                                {!precontractual &&
                                    <div className="row">
                                        <span className='my-3'>
                                            Si no puede escoger un tipo de disposición notifique a usuario de UABI
                                        </span>

                                    </div>
                                }
                            </Card>
                            <FormDisposition
                                realEstate={realEstate}
                                dispositionType={dispositionType}
                                contractual={contractual?.length > 0 ? contractual[0] : null}
                            />
                            <Card title="Histórico de contratos del bien inmueble">
                                <TableContract
                                    contrats={contracts}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 8, borderTop: '1px solid #ccc' }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.push("/disposition/list/");
                    }}
                >
                    Atrás
                </button>
                <div className="flex-fill" />
                {dispositionType !== '' && (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            history.push({ pathname: '/disposition/create/', state: { dispositionType, realEstate, precontractual, contractual: contractual?.length > 0 ? contractual[0] : null } });
                        }}
                    >
                        iniciar proceso Jurídico
                    </button>
                )}
            </div>
        </div>
    );
};
