import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../../../utils/ui';
import RoleForm from './../components/RoleForm';

const PermitsUser = () => {
    const history = useHistory();
    //const user: IUserAttributes = useSelector((states: any) => states.users.value);
    //console.log(user);
    const user = {
        cellphone_number: 369544125,
        email: 'Kan@gmail.com',
        entity_type: 'sin Animo de lucro',
        gender: 'f',
        id: 0,
        id_number: 1008569713,
        id_type: '2',
        location: '',
        names: 'karen',
        phone_number: 589614,
        society_type: 'Persona Natural',
        surnames: 'Nova',
        permits: [
            // {
            //     name_permit: 'nuevo',
            //     id_permit: '25'
            // },
            // {
            //     name_permit: 'detail_policy',
            //     id_permit: '1'
            // }
        ],
    };
    const _updateUser = async (userForm) => {
        const userFinal = {
            ...user,
            id_rol: userForm.id_rol,
            permits: userForm.permits,
        };
        console.log(userFinal);
        //let res: any;
        //res = await dispatch(actions.updateUser({ userForm }, id));
        //await swal('Usuario actualizado', res.data.message, 'success');
        //history.push(`/users/${user.user_id}`);
    };

    useEffect(() => {
        //dispatch(actions.getUser(parseInt(id)));
    }, []);
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <Card title="Asignar permisos al Usuario">
                                <RoleForm
                                    type="edit"
                                    onSubmit={(values) => {
                                        return _updateUser(values);
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
            </div>
        </div>
    );
};

export default PermitsUser;
