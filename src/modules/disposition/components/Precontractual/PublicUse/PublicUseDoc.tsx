import '../../../../../utils/assets/styles/public_use.css';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { actions } from '../../../redux';
import { useDispatch } from 'react-redux';
import PubilcUsePdf from './PubilcUsePdf';

interface IParams {
    values: any;
    realEstate: any;
    dispositionType: any;
}


const PublicUseDoc = () => {
    const location = useLocation<IParams>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { values, realEstate, dispositionType } = location.state;
    console.log(values, realEstate, dispositionType);
    return (
        <>
            <div className="h-100 d-flex flex-column">
                <PDFViewer style={{ width: '100%', height: "90%" }} showToolbar={false} >
                    <PubilcUsePdf values={values} realEstate={realEstate} />
                </PDFViewer>
                <div
                    className="bg-white d-flex flex-row justify-content-between"
                    style={{ padding: 16, borderTop: '1px solid #ccc' }}
                >
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                            // console.log('@values uso Publico',values)
                            history.push({ pathname: "/disposition/create/", state: { dispositionType, stage: "pre-contractual", realEstate, values } })
                        }}
                    >
                        Atrás
                    </button>
                    <div className="flex-fill" />
                    <PDFDownloadLink
                        document={<PubilcUsePdf values={values} realEstate={realEstate} />}
                        fileName="EstudioPrevioparaEspacioPúblicodeBienInmueble.pdf"
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
                                    type_disposition: "Publico",

                                }
                                delete final_values.dependency;
                                delete final_values.secretary;
                                console.log('final', final_values)

                                let res: any;
                                if (final_values.edit === true) {
                                    delete final_values.edit;
                                    res = await dispatch(actions.update_precontract(realEstate?.active_code, final_values))

                                } else {
                                    delete final_values.edit;
                                    res = await dispatch(actions.create_precontract(final_values, "Publico"))
                                }
                                console.log(res)

                                history.push({ pathname: `/dispositions/precontractual/view/${realEstate.active_code}`, state: { realEstate } })
                            }}
                        >
                            guardar y descargar
                        </button>
                    </PDFDownloadLink>
                </div>
            </div>
        </>
    );
};

export default PublicUseDoc;
