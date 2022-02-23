import { FC, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { actions } from '../../redux';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { FormikProps, FormikValues } from 'formik';
import DependencyForm from '../../components/DependencyForm';

interface IParams {
    id: string;
}

interface IProps {
    view?: string;
}

const EditDependency: FC<IProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();

    const { id } = useParams<IParams>();
    const dependency: any = useSelector((states: any) => states.generalList.dependency.value);

    const _updateDependency = async (data: any) => {
        let res: any;
        res = await dispatch(actions.update_dependency(data.id, data));
        await swal('Dependencia actualizada', res.message, 'success');
        history.push(`/general_list/dependency/${res.results.id}`);
    };

    useEffect(() => {
        dispatch(actions.clear_dependency());
        dispatch(actions.get_dependency_by_id(id));
    }, []);


    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Editar Dependencia</h5>
                        </div>
                        <div className="col-md-12">
                            <DependencyForm
                                dependency={dependency}
                                innerRef={form}
                                onSubmit={(values) => {
                                    return _updateDependency(values);
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
                        form.current?.submitForm();
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default EditDependency;
