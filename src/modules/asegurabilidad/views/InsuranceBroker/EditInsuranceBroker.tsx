import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { actions } from '../../redux';

// SERVICES
import { useSelector, useDispatch } from 'react-redux';

// INTERFACES
// import { IInsuranceBrokerAttributes } from '../../../../utils/interfaces';
import swal from 'sweetalert';
import { Card } from '../../../../utils/ui';
import InsuranceBrokerForm from '../../components/InsuranceBrokerForm';
import { Broker } from '../../redux/service';
import { FormikProps, FormikValues } from 'formik';
import { getAdressById } from '../../../../utils/components/Location/service';

interface IParams {
    id: string;
}

interface IProps {
    view?: string;
}

const EditInsuranceBroker: FC<IProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();
    const [location, setLocation] = useState(null);

    const { id } = useParams<IParams>();
    const insurance_broker: any = useSelector((states: any) => states.insurability.broker.value);

    const _updateInsuranceBroker = async (data: Broker) => {
        let res: any;
        res = await dispatch(actions.update_broker(data.id, data));
        await swal('Corredor de seguros actualizado', res.message, 'success');
        history.push(`/insurabilities/broker/${res.results.id}`);
    };

    useEffect(() => {
        dispatch(actions.get_broker_by_id(id));
    }, []);

    useEffect(() => {
        (async () => {
            if(insurance_broker) {
                const res: any = await getAdressById(insurance_broker.location_id);
                setLocation(res);
            }
        })();
    }, [insurance_broker]);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Editar Corredora de seguros</h5>
                        </div>
                        <div className="col-md-12">
                            <Card title={<h5>{'Información de la empresa'}</h5>}>
                                <InsuranceBrokerForm
                                    insurance_broker={insurance_broker}
                                    location={location}
                                    innerRef={form}
                                    onSubmit={(values) => {
                                        return _updateInsuranceBroker(values);
                                    }}
                                />
                            </Card>
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
                        form.current?.submitForm();
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default EditInsuranceBroker;
