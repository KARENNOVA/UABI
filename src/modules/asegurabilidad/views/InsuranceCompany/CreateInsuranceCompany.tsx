import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../redux';
import { Card } from '../../../../utils/ui';
import InsuranceCompanyForm from '../../components/InsuranceCompanyForm';
import { useEffect, useRef } from 'react';
import swal from 'sweetalert';
import { Company } from '../../redux/service';
import { FormikProps, FormikValues } from 'formik';

const CreateInsuranceCompany = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useRef<FormikProps<FormikValues>>();

    const createInsuranceCompany = async (data: Company) => {
        const res: any = await dispatch(actions.create_company(data));
        await swal('Compañia aseguradora creada', res.message, 'success');
        history.push(`/insurabilities/company/${res.results.id}`);
    };

    useEffect(() => {
        dispatch(actions.clear_company());
    }, []);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-row mb-3">
                            <h5>Crear compañía aseguradora</h5>
                        </div>
                        <div className="col-md-12">
                            <Card title="Información de la empresa">
                                <InsuranceCompanyForm
                                    innerRef={form}
                                    onSubmit={(values) => {
                                        return createInsuranceCompany(values);
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

export default CreateInsuranceCompany;
