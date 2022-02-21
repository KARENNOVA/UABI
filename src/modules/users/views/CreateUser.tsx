import { actions as actionsUser } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { swal_success } from '../../../utils';
import { useEffect, useRef } from 'react';
import { FormikProps, FormikValues } from 'formik';
import FormUserprueba from '../components/FormUserprueba';
import actions   from './../../acquisitions/redux/actions/index';

const CreateUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const form = useRef<FormikProps<FormikValues>>();
    const dependencies: any = useSelector((states: any) => states.acquisitions.dependencies.value);

    useEffect(() => {
        dispatch(actionsUser.clear_user());
        dispatch(actions.getDependencies())

    }, []);

    const createUser = async (values) => {
        const res: any = await dispatch(actionsUser.create_user(values));
        await swal_success.fire({ title: 'Usuario Creado', text: res.message, icon: 'success' });
        history.push(`/users/${res.results.detailsUser.user_id}`);
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <FormUserprueba
                                type='create'
                                type_rol='assign'
                                dependencies={dependencies}
                                innerRef={form}
                                onSubmit={(values) => {
                                    return createUser(values);
                                }}

                            />
                            {/* <Card title="información Usuario">
                                <GeneralForm
                                    type='create'
                                    innerRef={form}
                                    onSubmit={(values) => {
                                        return createUser(values);
                                    }}
                                />
                            </Card> */}
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

export default CreateUser;
