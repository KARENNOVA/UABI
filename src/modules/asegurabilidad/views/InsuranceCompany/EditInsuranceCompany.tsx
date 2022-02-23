import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { actions } from '../../redux';

// SERVICES
import { useSelector, useDispatch } from 'react-redux';

// INTERFACES
// import { IInsuranceCompanyAttributes } from '../../../../utils/interfaces';
import swal from 'sweetalert';
import { Card } from '../../../../utils/ui';
import InsuranceCompanyForm from '../../components/InsuranceCompanyForm';
import { Company } from '../../redux/service';
import { FormikProps, FormikValues } from 'formik';
import { getAdressById } from '../../../../utils/components/Location/service';

interface IParams {
    id: string;
}

interface IProps {
    view?: string;
}

const EditInsuranceCompany: FC<IProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();
    const [location, setLocation] = useState(null)

    const { id } = useParams<IParams>();
    const insurance_company: any = useSelector((store: any) => store.insurability.company.value);

    const _updateInsuranceCompany = async (data: Company) => {
        const res: any = await dispatch(actions.update_company(data.id, data));
        await swal('Compañia aseguradora actulizada', res.message, 'success');
        history.push(`/insurabilities/company/${res.results.id}/`);
    };

    useEffect(() => {
        dispatch(actions.clear_company())
        dispatch(actions.get_company_by_id(id));
    }, [dispatch, id]);

    useEffect(() => {
        (async () => {
            if(insurance_company) {
                const res: any = await getAdressById(insurance_company.location_id);
                setLocation(res);
            }
        })();
    }, [insurance_company]);
    // console.log(location);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Editar Compañía aseguradora</h5>
                        </div>
                        <div className="col-md-12">
                            <Card title="Información de la empresa">
                                <InsuranceCompanyForm
                                    innerRef={form}
                                    insurance_company={insurance_company}
                                    location={location}
                                    onSubmit={(values) => {
                                        return _updateInsuranceCompany(values);
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
                        form.current?.submitForm();
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default EditInsuranceCompany;
