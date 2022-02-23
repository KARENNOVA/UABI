import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../redux';
import { useEffect, useRef } from 'react';
import swal from 'sweetalert';
import { FormikProps, FormikValues } from 'formik';
import DependencyForm from '../../components/DependencyForm';
import { Dependency } from '../../redux/service/dependency';

const CreateDependency = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();

    useEffect(() => {
        dispatch(actions.clear_dependency());
    }, []);

    const createDependency = async (data: any) => {
        const res: any = await dispatch(actions.create_dependency(data));
        await swal('Dependencia creada', res.message, 'success');
        history.push(`/general_list/dependency/${res.results.id}`);
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Crear Dependencia</h5>
                        </div>
                        <div className="col-md-12">
                            <DependencyForm
                                innerRef={form}
                                onSubmit={(values: Dependency) => {
                                    return createDependency(values);
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

export default CreateDependency;
