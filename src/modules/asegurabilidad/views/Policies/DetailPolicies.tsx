import { Card, Link } from '../../../../utils/ui';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actions } from '../../redux';
import { useHistory } from 'react-router-dom';
import RealEstateList from '../../../acquisitions/components/RealEstateList';
import { PolizaViewForm } from '../../components/PolizaViewForm';

interface IParams {
    id: string;
}
const DetailInsurability = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams<IParams>();

    const realEstatesPolicy: any = useSelector((store: any) => store.insurability.policiesRealEstate.value);

    useEffect(() => {
        dispatch(actions.clearPolicy())
        dispatch(actions.realEstatesPolicy(Number(id)));
    }, [dispatch, id]);



    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="bg-white d-flex flex-column h-100">
                    <div className="d-flex flex-row mb-3 pt-3 ps-4 shadow-sm p-3 bg-white rounded">
                        <h5 className="col-11 ">Detalle Póliza</h5>
                        <Link
                            to={`/insurabilities/policy/edit/${id}`}
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
                                <PolizaViewForm  policy_id={id}/>
                                <Card title="Bienes Inmuebles de la póliza">
                                    <RealEstateList realEstateFilter={realEstatesPolicy} filters={{key: "default"}}/>
                                </Card>
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

export default DetailInsurability;
