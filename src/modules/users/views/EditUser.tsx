import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as actionsUser, } from '../redux';
import { swal_success } from '../../../utils';
import { FormikProps, FormikValues } from "formik";
import FormUserprueba from '../components/FormUserprueba';
import actions from './../../acquisitions/redux/actions/index';

interface IParams {
    id: string;
}

interface IProps {
    view?: string;
}

const EditUser: FC<IProps> = () => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();
    const dependencies: any = useSelector((states: any) => states.acquisitions.dependencies.value);
    const [user, roles, permits] = useSelector((store: any) => [
        store.users.user.value?.detailsUser,
        store.users.user.value?.roles,
        store.users.user.value?.permits,
    ]);
    const _updateUser = async (userForm) => {
        if (user?.id_number === `${userForm?.user?.id_number}`) {
            userForm.user.id_number = "";
        }

        if (userForm) {
            let res: any;
            res = await dispatch(actionsUser.update_user(id, userForm));
            await swal_success.fire({ title: 'Usuario actualizado', text: res.message, icon: 'success' });
            history.push(`/users/${res.results.detailsUser.user_id}/`);
        }
    };

    useEffect(() => {
        dispatch(actionsUser.clear_user())
        dispatch(actionsUser.get_user_by_id(parseInt(id)));
        dispatch(actions.getDependencies())
    }, []);




    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <FormUserprueba
                                type='edit'
                                type_rol='assign'
                                user={user}
                                user_roles={roles || []}
                                user_permits={permits || []}
                                dependencies={dependencies}
                                innerRef={form}
                                onSubmit={(values) => {
                                    return _updateUser(values);
                                }}

                            />
                            {/* <Card title="Edición de Usuario">
                                <GeneralForm
                                    type="edit"
                                    innerRef={form}
                                    user={user?.detailsUser}
                                    address={adress}
                                    onSubmit={(values) => {
                                        return _updateUser(values);
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

export default EditUser;
