import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../redux';
import ProjectForm from '../../components/ProjectForm';
import {  useEffect, useRef } from 'react';
import { FormikProps, FormikValues } from 'formik';

const CreateRealEstate = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();
    const dependencies: any = useSelector((states: any) => states.acquisitions.dependencies.value);
    const createProject = async (values) => {

        const res: any = await dispatch(actions.createProject(values));
        history.push(`/acquisitions/projects/${res.id}`);

    };

    useEffect(() => {
        dispatch(actions.getDependencies())
    }, [])

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <h5 style={{ fontWeight: 600, marginLeft: 20 }}>Crear Proyecto</h5>
                            <ProjectForm
                                dependencies={dependencies}
                                innerRef={form}
                                onSubmit={(values) => {
                                    return createProject(values);
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

export default CreateRealEstate;
