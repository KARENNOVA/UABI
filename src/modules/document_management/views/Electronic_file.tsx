import React, { useEffect } from 'react'
import { Card } from '../../../utils/ui';
import { useHistory, useParams } from 'react-router-dom';
import CollapseElectronicFiel from '../components/CollapseElectronicFiel';
import { useDispatch, useSelector } from 'react-redux';
import actions from './../redux/actions';

interface IParams {
    id: string;
}

const Electronic_file = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();
    const documents: any = useSelector((state: any) => state.documentManagement.files.value);
    console.log(documents)
    // const _update = async (data: Broker) => {
    //     let res: any;
    //     res = await dispatch(actions.update_broker(data.id, data));
    //     await swal('Corredor de seguros actualizado', res.message, 'success');
    //     history.push(`/insurabilities/broker/${res.results.id}`);
    // };

    useEffect(() => {
        dispatch(actions.getFiles(id));
    }, []);



    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <h5 style={{ fontWeight: 600, marginLeft: 20 }}>Expediente Electrónico</h5>
                            <Card
                                title={`Documentos asociados a:`}
                            >
                                <CollapseElectronicFiel
                                    documents={documents}
                                    real_estate_id={ Number(id)}
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
            </div>
        </div>

    )
}

export default Electronic_file
