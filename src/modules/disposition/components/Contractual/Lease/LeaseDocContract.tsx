import React from 'react'
import '../../../../../utils/assets/styles/contract_lease.css';
import { useLocation, useHistory } from 'react-router-dom';
import LeaseContractPdf from './LeaseContractPdf';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import actions from './../../../redux/actions';
import { useDispatch } from 'react-redux';

interface IParams {
    values_contract: any;
    realEstate: any;
    dispositionType: any;
}
const LeaseDocContract = () => {
    const location = useLocation<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const { values_contract, realEstate, dispositionType } = location.state;
    console.log(values_contract, realEstate, dispositionType);
    const arrendamiento = {
        //info general
        boundaries: "descripción de linderos",
        business_type: { select: 'otro', input: 'casino' },
        contract_period: 12,
        destination_realestate: "destinacion del bien inmueble",
        environmental_risk: "riesgos",
        lockable_base: 10,
        registration_date: "2021-12-15",
        //Arrendamiento
        IVA: 260300,
        administration_value: 150000,
        coverage: "cumplimiento",
        fines: "Multas",
        appraisal_date: "2021-12-01",
        appraisal_number: 6565556,
        prediation_date: "2021-12-22",
        prediation_number: "635465",
        public_service: "Aforo",
        subtotal: 1630300,
        total: 1793300,
        value_public_service: 13000,
        vigilance_value: 14000,
        //solicitante
        //si es persona natural se agrega:
        detailsApplicant: {
            id_type: '1',
            id_number: 10085632,
            names: { firstName: 'Bryan', lastName: 'Manuel' },
            surnames: { firstSurname: 'Cendales', lastSurname: 'Rodriguez' },
            email: 'Bryan@correo.com',
            phone_number: "1455499"
        },

        applicant: {
            type_society: 'Persona Juridica',
            id_type: '',
            id_number: 3658950,
            company_name: 'nombre de la razon social',
            email: 'empresa@correo.com',
        },
        location_applicant: { address: 'CL 5266 #58 - 45', id: '127' },
        //representante legal
        representative: { type_society: 'Persona Natural' },
        detailsRepresentative: {
            id_type: '1',
            id_number: 4582103699,
            names: { firstName: 'Juan', lastName: 'Pablo' },
            surnames: { firstSurname: 'Hernandez', lastSurname: 'Gil' },
            email: 'juanHer@gmail.com',
        },
        //lider acargo
        leader: {
            type_society: 'Persona Natural',
            post: 'Líder de Programa',
            dependence: 'Unidad Administración de Bienes Inmuebles',
            secretary: 'Subsecretaría de Gestión de Bienes'
        },
        detailsLeader: {
            id_type: '1',
            id_number: 10085632,
            names: { firstName: 'Bryan', lastName: 'Manuel' },
            surnames: { firstSurname: 'Cendales', lastSurname: 'Rodriguez' },
            email: 'Bryan@correo.com',
        },
        location_leader: { address: 'CR 1 #6 - 8', id: '129' },

        //analisis de riesgos
        operational_risk: {
            degree_occurrence: '',
            impact_degree: '',
            responsable: '',
            mitigation_mechanism: ''
        },
        regulatory_risk: {
            degree_occurrence: '',
            impact_degree: '',
            responsable: '',
            mitigation_mechanism: ''
        },

        //info tabla final
        approved: { name: 'aprobo nombre', post: 'aprobo cargo' },
        elaborated: { name: 'elaboro nombre', post: 'elaboro cargo' },
        revised: { name: 'reviso nombre', post: 'reviso cargo' },

        idRealEstate: 31
    }
    const doc = <LeaseContractPdf values_contract={values_contract} realEstate={realEstate} arrendamiento={arrendamiento} />
    return (
        <div className="h-100 d-flex flex-column">
            <PDFViewer className="w-100 mt-5" style={{ height: 600 }} showToolbar={false}>
                {doc}
            </PDFViewer>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                        history.push({ pathname: "/disposition/create/", state: { dispositionType, stage: "contractual", realEstate, values_contract } })
                    }}
                >
                    Atrás
                </button>
                <div className="flex-fill" />
                <PDFDownloadLink
                    document={doc}
                    fileName="EstudioPrevioArrendamiento.pdf"
                >
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={async () => {
                            let res: any;
                            const final_values = {
                                act_number: values_contract?.act_number,
                                contract_decree: values_contract?.contract_decree,
                                decree_date: new Date(values_contract?.decree_date).getTime(),
                                decree_number: values_contract?.decree_number,
                                dispose_area: values_contract?.dispose_area,
                                active_code: values_contract?.active_code,
                                finish_date: new Date(values_contract?.finish_date).getTime(),
                                guarantee: values_contract?.guarantee,
                                manager_sabi: values_contract?.manager_sabi,
                                minutes_date: new Date(values_contract?.minutes_date).getTime(),
                                object_contract: values_contract?.object_contract,
                                secretary: {
                                id: values_contract?.secretary?.id,
                                },
                                subscription_date: new Date(values_contract?.subscription_date).getTime(),
                                type_contract: "Arrendamiento"
                            }
                            console.log(final_values)

                            if (values_contract.editContract === true) {
                                res = await dispatch(actions.update_contract(values_contract?.id, final_values))

                            } else {
                                res = await dispatch(actions.create_contract(final_values))
                            }
                            console.log(res)
                            history.push({ pathname: `/disposition/contract/${res.results.id}/`})
                        }}
                    >
                        guardar y descargar
                    </button>
                </PDFDownloadLink>
            </div>
        </div>
    )
}

export default LeaseDocContract
