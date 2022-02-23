import { useParams, useHistory } from 'react-router-dom';
import { IPolicyAttributes } from '../../../../utils/interfaces';
import { useEffect, useRef, useState } from 'react';
import PolizaForm from '../../components/PolizaForm';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Card } from '../../../../utils/ui';
import { actions } from '../../redux';

interface IParams {
    id: string;
}

const EditPolicy = () => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const form_ref = useRef<any>();
    const [realEstates, setRealEstates] = useState([]);
    const policy: IPolicyAttributes = useSelector((store: any) => store.insurability.policy.value);
    const insurance_companies: any = useSelector((store: any) => store.insurability.companies.value);
    const insurance_brokers: any = useSelector((store: any) => store.insurability.brokers.value);
    const realEstatesPolicy: any = useSelector((store: any) => store.insurability.policiesRealEstate.value);
    // const realEstate: any = useSelector((store: any) => store.acquisitions.realEstate.value);
    // console.log('bi editar',realEstate)
    useEffect(() => {
        dispatch(actions.get_list_companies());
        dispatch(actions.get_all_brokers());
        dispatch(actions.clearPolicy())
        dispatch(actions.getPolicy(id));
        dispatch(actions.realEstatesPolicy(Number(id)));
        // dispatch(actions.getRealEstateEdit("12"));K

    }, []);


    useEffect(() => {
        if(realEstatesPolicy.length > 0) {
            const id_bis = realEstatesPolicy.map(r => r.id).join(",");
            realEstatesWithoutPolicy(id_bis);
        }
    }, [realEstatesPolicy]);

    const realEstatesWithoutPolicy = async  (id_bis) => {
        const res: any = await dispatch(actions.getRealEstatesWithoutPolicy("policy", id_bis));
        setRealEstates(res);
    }

    const _updatePolicy = async (policyForm) => {
        console.log(policyForm);
        await dispatch(actions.updatePolicy(policyForm, id));

        history.push(`/insurabilities/policy/${id}/`);

    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <Card title="Póliza">
                                <PolizaForm
                                    type="edit"
                                    policy={policy}
                                    companies={insurance_companies}
                                    brokers={insurance_brokers}
                                    realEstatesPolicy={realEstatesPolicy}
                                    realEstates={realEstates}
                                    innerRef={form_ref}
                                    onSubmit={(values) => {
                                        return _updatePolicy(values);
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
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        form_ref.current.submitForm();
                    }}
                    disabled={form_ref.current?.isSubmitting}
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

export default EditPolicy;
