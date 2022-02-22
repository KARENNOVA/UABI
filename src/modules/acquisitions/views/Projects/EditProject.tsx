import { FC, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { actions } from '../../redux';

// SERVICES
import { useSelector, useDispatch } from 'react-redux';

// INTERFACES
import { IProjectAttributes } from '../../../../utils/interfaces';
import swal from 'sweetalert';
import { Card } from '../../../../utils/ui';
import ProjectForm from '../../components/ProjectForm';
import {  useRef } from 'react';
import { FormikProps, FormikValues } from 'formik';

interface IParams {
    id: string;
}

interface IProps {
    view?: string;
}

const DetailProject: FC<IProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();
    const dependencies: any = useSelector((states: any) => states.acquisitions.dependencies.value);
    const { id } = useParams<IParams>();
    const project: IProjectAttributes = useSelector((states: any) => states.acquisitions.project.value);

    useEffect(() => {
        dispatch(actions.clearDependencies())
        dispatch(actions.getDependencies())
    }, [])

    const _updateProject = async (projectForm) => {
        let res: any;
        res = await dispatch(actions.updateProject(projectForm, id));
        await swal('Proyecto actualizado', res.data.message, 'success');
        history.push(`/acquisitions/projects/${project.id}`);
    };

    useEffect(() => {
        dispatch(actions.clearProject())
        dispatch(actions.getProject(id));
    }, []);


    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <h5 style={{ fontWeight: 600, marginLeft: 20 }}>
                                <>Proyecto: {project?.name}</>
                            </h5>

                            <ProjectForm
                                dependencies={dependencies}
                                innerRef={form}
                                project={project}
                                onSubmit={(values) => {
                                    return _updateProject(values);
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
                    Atras
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

export default DetailProject;
