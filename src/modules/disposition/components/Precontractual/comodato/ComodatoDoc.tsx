import '../../../../../utils/assets/styles/comodato.css';
import { useLocation, useHistory } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ComodatoPdf from './ComodatoPdf';
import { useDispatch } from 'react-redux';
import actions from './../../../redux/actions';

interface IParams {
    values: any;
    realEstate: any;
    dispositionType: any;

}

const ComodatoDoc = () => {
    const location = useLocation<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const { values, realEstate, dispositionType } = location.state;
    console.log(values, realEstate, dispositionType);
    let contract_value = 0;
    if (values?.resolution === "si") {
        contract_value =
            (values?.value_economic_obligations +
                values?.network_value +
                values?.administration_value +
                values?.conservation_value +
                values?.cleaning_value +
                values?.surveillance_value +
                values?.value_domiciliary_public +
                values?.value_repairs_damages +
                values?.value_locative_repairs)
    } else {
        contract_value = values?.commercial_appraisal;
    }

    return (
        <div className="h-100 d-flex flex-column">
            <PDFViewer style={{ width: '100%', height: "90%" }} showToolbar={false}>
                <ComodatoPdf values={values} realEstate={realEstate} />
            </PDFViewer>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        //console.log('@values',values)
                        history.push({ pathname: "/disposition/create/", state: { dispositionType, stage: "pre-contractual", realEstate, values, precontractual: values?.edit === true ? values : null } })
                    }}
                >
                    Atrás
                </button>
                <div className="flex-fill" />
                <PDFDownloadLink
                    document={<ComodatoPdf values={values} realEstate={realEstate} />}
                    fileName="EstudioPrevioparacomodatodeBienInmueble.pdf"
                >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={async () => {

                        let final_values = {
                            ...values,
                            applicant: {
                                id: values.applicant.id
                            },
                            business_type: values.business_type.select === "otro" ? values.business_type.input : values.business_type.select,
                            prediation_date: new Date(values.prediation_date).getTime(),
                            registration_date: new Date(values.registration_date).getTime(),
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
                            active_code: realEstate?.active_code[0],

                            contract_value: contract_value || 0,
                            type_disposition: "Comodato",
                            // beneficiary_location_id: {
                            //     id: 20,
                            // }

                        }
                        delete final_values.canon_value;
                        delete final_values.location;
                        delete final_values.dependency;
                        delete final_values.secretary;
                        console.log('final',final_values)
                        let res: any;
                        if (final_values.edit === true) {
                            delete final_values.edit;
                            final_values = {
                                ...final_values,
                                beneficiary_location_id: {
                                    id: final_values?.beneficiary_location_id || 20
                                }
                            }
                            res = await dispatch(actions.update_precontract(realEstate?.active_code, final_values))

                        } else {
                            delete final_values.edit;
                            final_values = {
                                ...final_values,
                                beneficiary_location_id: {
                                    id: final_values?.beneficiary_location_id || 20
                                }
                            }
                            res = await dispatch(actions.create_precontract(final_values, "Comodato"))
                        }
                        console.log(res)

                        history.push({ pathname: `/dispositions/precontractual/view/${realEstate.active_code}`, state: {  realEstate } })
                    }}
                >
                    guardar y descargar
                </button>
                </PDFDownloadLink>
            </div>
        </div>
    );
};

export default ComodatoDoc;
