import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux';
import DependencyDetail from './../../components/DependencyDetail';
import SubdependencyDetail from '../../components/SubdependencyDetail';
import { Dependency } from '../../redux/service/dependency';

interface IParams {
    id: string;
}

const DetailDependency = () => {
    const { id } = useParams<IParams>();
    const dispatch = useDispatch();
    const history = useHistory();
    const dependency: Dependency = useSelector((states: any) => states.generalList.dependency.value);

    useEffect(() => {
        dispatch(actions.clear_dependency())
        dispatch(actions.get_dependency_by_id(id));
    }, []);




    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Dependencia</h5>
                        </div>
                        <div className="col-md-12">
                            <DependencyDetail dependency={dependency} />
                            <SubdependencyDetail subdependencies={[]} />
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

export default DetailDependency;
