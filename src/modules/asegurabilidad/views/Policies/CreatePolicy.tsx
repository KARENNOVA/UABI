import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from '../../../../utils/ui';
import { actions } from '../../redux';
import { useEffect, useRef, useState } from 'react';
import { clearRealEstates, getRealEstate } from '../../../acquisitions/redux/actions/realEstates';
import PolizaForm from '../../components/PolizaForm';
import { IRealEstateAttributes } from '../../../../utils/interfaces';

interface IParams {
    id: string;
}
const CreateInsurability = () => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const form_ref = useRef<any>();
    const [realEstates, setRealEstates] = useState([]);

    const realEstate: IRealEstateAttributes = useSelector((states: any) => states.acquisitions.realEstate.value);
    const insurance_companies: any = useSelector((store: any) => store.insurability.companies.value);
    const insurance_brokers: any = useSelector((store: any) => store.insurability.brokers.value);
    //console.log(insurance_brokers)
    useEffect(() => {
        dispatch(clearRealEstates());
        dispatch(actions.get_list_companies());
        dispatch(actions.get_all_brokers());
        console.log(id, realEstate);
        if (id) {
            dispatch(getRealEstate(id));
        }
    }, [id]);

    useEffect(() => {
        dispatch(clearRealEstates());
    }, []);

    useEffect(() => {
            realEstatesWithoutPolicy();
    }, []);

    const realEstatesWithoutPolicy = async  () => {
        const res: any = await dispatch(actions.getRealEstatesWithoutPolicy("policy", []));
        setRealEstates(res);
    }

    const createPolicy = async (dataPolicy) => {
        //console.log(dataPolicy)
        const res: any = await dispatch(actions.createPolicy(dataPolicy));
        //await swal("Message", response.message, "success");
        console.log(res)
        if(res) {
            history.push(`/insurabilities/policy/${res.id}/`);
        }
    };
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <Card title="Crear Póliza">
                                <PolizaForm
                                    type_assurance="Normal"
                                    type="create"
                                    companies={insurance_companies}
                                    brokers={insurance_brokers}
                                    realEstates={realEstates}
                                    innerRef={form_ref}
                                    onSubmit={createPolicy}
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
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        form_ref.current.submitForm();
                    }}
                    // disabled={form_ref.current?.isSubmitting}
                >
                    Guardar
                    {form_ref.current?.isSubmitting && (
                        <i
                            className="fa fa-spinner fa-spin"
                            style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                        />
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateInsurability;
