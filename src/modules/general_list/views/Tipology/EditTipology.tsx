import { FC, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { actions } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Card } from '../../../../utils/ui';
import { FormikProps, FormikValues } from 'formik';
import TipologyForm from '../../components/TipologyForm';

interface IParams {
    id: string;
}

interface IProps {
    view?: string;
}

const EditTipology: FC<IProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();

    const { id } = useParams<IParams>();
    const tipology: any = useSelector((states: any) => states.generalList.tipology.value);

    const _updateTipology = async (data: any) => {
        let res: any;
        res = await dispatch(actions.update_tipology(data.id, data));
        await swal('Tipología actualizada', res.message, 'success');
        history.push(`/general_list/tipology/${res.results.id}`);
    };

    useEffect(() => {
        dispatch(actions.clear_tipology());
        dispatch(actions.get_tipology_by_id(id));
    }, []);


    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Editar Tipología</h5>
                        </div>
                        <div className="col-md-12">
                            <Card title={<h5>{'Información de la Tipología'}</h5>}>
                                <TipologyForm
                                    tipology={tipology}
                                    innerRef={form}
                                    onSubmit={(values) => {
                                        return _updateTipology(values);
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

export default EditTipology;
