import { Link } from '../../../../utils/ui';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { actions } from '../../redux';
import RoleViewForm from './../../components/RoleViewForm';
import { TemplateContext } from '../../../../utils/components/template/template_context';

interface IParams {
    id: string;
}
const DetailRoles = () => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const role: any = useSelector((store: any) => store.users.rol.value);
    const context = useContext(TemplateContext);
    useEffect(() => {
        dispatch(actions.getRole(Number(id)));
    }, [dispatch, id]);

    // const finalRole = {
    //     name: role?.name,
    //     permits: role?.permits?.map(a => a.id) || [],
    // }

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="bg-white d-flex flex-column h-100">
                    <div className="d-flex flex-row mb-3 pt-3 ps-4 shadow-sm p-3 bg-white rounded">
                        <h5 className={`col-10 col-md-${context.menu_collapsed ? 11 : 10 } col-lg-11`}>Detalle Rol</h5>
                        <Link
                            to={`/roles/edit/${id}/`}
                            name=""
                            avatar={false}
                            icon={
                                <i
                                    style={{ marginLeft: '30px', fontSize: 16, color: '#000' }}
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                />
                            }
                        />
                    </div>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <RoleViewForm role={role} />
                            </div>
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
            </div>
        </div>
    );
};

export default DetailRoles;
