import { AxiosResponse } from 'axios';
import { documents_http, http } from '../../../../config/axios_instances';
import { swal_success} from '../../../../utils';
import { IPaginable } from '../../../../utils/interfaces';
import {
    IPolicyAttributes,
    IPolicyResponse,
} from '../../../../utils/interfaces';
import { compute_doc_policy } from '../../views/Policies/poliza.utils';
import { create_document } from '../../../../utils/components/DocumentsModal/services';
import { IRealEstateAttributes } from '../../../../utils/interfaces/components.interfaces';

// Services: POST
export const createPolicy = async (
    data: any,
    id?: number
): Promise<IPolicyAttributes | string> => {
    try {
        let URI = `/insurabilities`;
        const doc: any = await compute_doc_policy(data.insurance_document);
        const create_doc: any = await create_document(doc, null);

        delete data.insurance_document;
        delete data.registry_numbers;
        const dataFinal = {
            ...data,
            insurance_document_id: create_doc[0].id,
        };

        let res: AxiosResponse<IPolicyResponse> = await http.post(
            URI,
            dataFinal
        );
        await swal_success.fire('poliza creada', res.data.message, 'success');
        return res.data.results;
    } catch (error) {
        console.error(error);
        //await swal.fire('Error', '', 'error');

        return Promise.reject('Error');
    }
};

export const getPolicies = async (filters?): Promise<IPaginable<IPolicyAttributes> | string> => {
    try {
        let URI = `/insurabilities`;
        let res: AxiosResponse<IPaginable<IPolicyAttributes>> = await http.get(
            URI,
            {
                params: {
                    ...filters,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

export const getPolicy = async (
    id: string
): Promise<IPolicyAttributes | string> => {
    try {
        let URI = `/insurabilities`;
        let res: AxiosResponse<IPolicyResponse> = await http.get(URI, {
            params: { id },
        });
        if(res.data.results) {
            res.data.results.insurance_document = await getDocument(
                res.data.results?.insurance_document_id
            );

        }

        return res.data.results;
    } catch (error) {
        console.log(error)
        return Promise.reject('Error');
    }
};

const getDocument = async (id) => {
    try {
        let URI = `/docs`;
        let res: AxiosResponse<IPolicyResponse> = await documents_http.get(URI,{
            params: { id }
        });
        return res.data.results;
    } catch (error) {
        return Promise.reject('Error');
    }
};

export const getRealEstateEdit = async (
    id: string
): Promise<IRealEstateAttributes | string> => {
    try {
        let URI = `/real-estates`;
        let res: AxiosResponse = await http.get(URI, {
            params: { id },
        });
        return res.data.results;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

export const getRealEstatesWithoutPolicy = async (
    without: string,
    id_bis: []
): Promise<IRealEstateAttributes | string> => {

    const key = "registry_number";
    try {
        let URI = `/real-estates/list/`;
        let res: AxiosResponse = await http.get(URI, {
            params: { without, key, edit: id_bis },
        });
        return res.data.results;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

// Services: PUT
export const updatePolicy = async (data: any, id: number) => {
    try {

        // Crea un documento nuevo si se cambio el documento
        let new_doc: any = { id: '' };
        if (
            !data.insurance_document.hasOwnProperty('id') &&
            data.insurance_document.hasOwnProperty('pdf')
        ) {
            new_doc = await create_document(data.insurance_document, id);
            data.insurance_document_id = new_doc.id;
        }

        // guarda las compañias con id y porcentaje
        const companias = [];
        data.insurance_companies.map((company) =>
            companias.push({
                id: company.id,
                percentage_insured: company.percentage_insured,
            })
        );

        // poliza editada para enviar
        const finalData = {
            ...data,
            id: id,
            // insurance_broker_id: data.insurance_broker.id,
            insurance_document_id: data.insurance_document_id,
            insurance_companies: companias,
        };
        delete finalData.insurance_document;
        delete finalData.insurance_broker;
        delete finalData.registry_numbers;
        delete finalData.audit_trail;
        delete finalData.status;

        let URI = `/insurabilities`;
        let res: AxiosResponse<IPolicyResponse> = await http.put(
            URI,
            finalData,
            {
                params: { id },
            }
        );
        await swal_success.fire('poliza actualizada', res.data.message, 'success');
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

export const realEstatesPolicy = async (policy_id: number) => {
    try {
        let URI = `/insurabilities`;
        let res: AxiosResponse<IPolicyResponse> = await http.get(URI, {
            params: { policy_id },
        });
        return res.data.results;
    } catch (error) {
        return Promise.reject('Error');
    }
};

const services = {
    createPolicy,
    getPolicies,
    getPolicy,
    updatePolicy,
    realEstatesPolicy,
};

export default services;
