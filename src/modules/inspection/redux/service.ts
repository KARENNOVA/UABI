// import { AxiosResponse } from 'axios';
// import { http } from '../../../config/axios_instances';

import { AxiosResponse } from 'axios';
import { http } from '../../../config/axios_instances';
import {NewInspection} from "../custom_types";

export interface AllInspectionsResponse {
    message: string;
    results: Inspection[];
    page: number;
    count: number;
    next_page?: any;
    previous_page?: any;
    total_results: number;
}

export interface ListInspectionsResponse {
    message: string;
    results: Inspection[];
}

export interface InspectionResponse {
    message: string;
    results: Inspection;
}

export interface Inspection {
    id?: number;
    // TODO: confirmar que campos debe terner una inspeccion
    status?: number;
    audit_trail?: any;
}

export const get_all_inspections = async (filters?) => {
    try {
        const URI = '/real-estates/list';
        const res: AxiosResponse<AllInspectionsResponse> = await http.get(URI, {
            params: {
                ...filters,
                to: 'inspection',
                with: 'pagination',
            },
        });
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const get_list_inspections = async () => {
    try {
        const URI = '/real-estates/list';
        const res: AxiosResponse<ListInspectionsResponse> = await http.get(
            URI,
            {
                params: {
                    to: 'inspection',
                },
            }
        );
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const create_inspection = async (id, data: NewInspection) => {
    console.log(data);

    const body = {
        ...data,
        occupant: {
            ...data.occupant,
            document_number: data.occupant.documentNumber

        },
        ocupant: data.occupant,
        ocupation: data.occupation,
        photografic_register: {
            facade: "x",
            general: []
        }
    }
    delete body.occupation;
    try {
        const URI = '/inspections/';
        const res: AxiosResponse<InspectionResponse> = await http.post(URI, {
            ...body,
        }, {
            params: { id }
        });
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const get_inspection_by_real_estate_id = async (id) => {
    try {
        const URI = `/inspections/`;
        const res: AxiosResponse<InspectionResponse> = await http.get(URI, {
            params: { id },
        });
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const update_inspection = async (id, data: Inspection) => {
    try {
        const URI = '/inspections/';
        const res: AxiosResponse<InspectionResponse> = await http.put(
            URI,
            data,
            // TODO: campos de la inspeccion

            {
                params: {
                    id,
                },
            }
        );
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const delete_inspection = async (id) => {
    try {
        const URI = `/inspections/${id}/`;
        const res: AxiosResponse<InspectionResponse> = await http.delete(URI);
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};


const services = {
    get_all_inspections,
    get_list_inspections,
    create_inspection,
    get_inspection_by_real_estate_id,
    update_inspection,
    delete_inspection,
};

export default services;
