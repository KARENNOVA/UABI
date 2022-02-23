import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../redux';
import { Card } from '../../../../utils/ui';
import InsuranceBrokerForm from '../../components/InsuranceBrokerForm';
import { useEffect, useRef } from 'react';
import { Broker } from '../../redux/service';
import swal from 'sweetalert';
import { FormikProps, FormikValues } from 'formik';

const CreateInsuranceBroker = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();

    useEffect(() => {
        dispatch(actions.clear_broker());
    }, []);

    const createInsuranceBroker = async (data: Broker) => {
        const res: any = await dispatch(actions.create_broker(data));
        await swal('Corredor de seguros creado', res.message, 'success');
        history.push(`/insurabilities/broker/${res.results.id}`);
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Crear corredora de seguros</h5>
                        </div>
                        <div className="col-md-12">
                            <Card title={<h5>{'Información de la empresa'}</h5>}>
                                <InsuranceBrokerForm
                                    innerRef={form}
                                    onSubmit={(values: Broker) => {
                                        return createInsuranceBroker(values);
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

export default CreateInsuranceBroker;
