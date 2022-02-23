import '../../../../../utils/assets/styles/lease.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import actions from '../../../redux/actions';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import LeasePdf from './LeasePdf';
import moment from 'moment';

interface IParams {
    values: any;
    realEstate: any;
    dispositionType: any;

}
const LeaseDoc = () => {
    const location = useLocation<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const { values, realEstate, dispositionType } = location.state;
    console.log(values, realEstate, dispositionType);
    return (
        <div className="h-100 d-flex flex-column">
            <PDFViewer style={{ width: '100%', height: "90%" }} showToolbar={false}>
                <LeasePdf values={values} realEstate={realEstate} />
            </PDFViewer>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.push({ pathname: "/disposition/create/", state: { dispositionType, stage: "pre-contractual", realEstate, values } })
                    }}
                >
                    Atrás
                </button>
                <div className="flex-fill" />
                <PDFDownloadLink
                    document={<LeasePdf values={values} realEstate={realEstate} />}
                    fileName="EstudioPrevioparaarrendamientodeBienInmueble.pdf"
                >
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={async () =>  {
                            // let value_public_service = 0
                            const final_values = {
                                ...values,
                                applicant: {
                                    id: values.applicant.id
                                },
                                business_type: values.business_type.select === "otro" ? values.business_type.input : values.business_type.select,
                                prediation_date: new Date(values.prediation_date).getTime(),
                                registration_date: new Date(values.registration_date).getTime(),
                                appraisal_date: new Date(values.appraisal_date).getTime(),
                                leader: {
                                    id: values.leader.id
                                },
                                operational_risk: {
                                    ...values.operational_risk,
                                    type: "operational"
                                },
                                regulatory_risk: {
                                    ...values.regulatory_risk,
                                    type: "regulatory"
                                },
                                iva: Number(values.iva),
                                approved: {
                                    id: values.approved.id
                                },
                                revised: {
                                    id: values.revised.id
                                },
                                elaborated: {
                                    id: values.elaborated.id
                                },
                                representative: {
                                    id: values.representative.id
                                },
                                active_code: realEstate?.active_code,
                                type_disposition: "Arrendamiento"

                            }
                            delete final_values.canon_value;
                            delete final_values.dependence;
                            delete final_values.secretary;
                            delete final_values.destination_realEstate;
                            let res: any;

                            if (final_values.edit === true) {
                                delete final_values.edit;
                                res = await dispatch(actions.update_precontract(realEstate?.active_code, final_values))

                            } else {
                                delete final_values.edit;
                                res = await dispatch(actions.create_precontract(final_values, 'Arrendamiento'))
                            }
                            console.log('valores',final_values)
                            history.push({ pathname: `/dispositions/precontractual/view/${realEstate.active_code}`, state: {  realEstate } })

                            // if (values.public_service === "Recobro") {
                            //     value_public_service = values.recovery_value;
                            // } else if (values.public_service === "Aforo") {
                            //     value_public_service = values.value_aforo;
                            // } else if (values.public_service === "Contador individualizado") {
                            //     value_public_service = values.counter_value;
                            // } else if (values.public_service === "Prepago") {
                            //     value_public_service = 0
                            // }
                            // const values_final = {
                            //     ...values,
                            //     value_public_service
                            // }
                        }}
                    >
                        guardar y descargar
                    </button>
                </PDFDownloadLink>
            </div>
        </div>
    );
};

export default LeaseDoc;
