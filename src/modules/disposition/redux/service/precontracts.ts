import { AxiosResponse } from "axios";
import { http } from "../../../../config/axios_instances";
import { swal_success } from "../../../../utils";

const create_Lease = async (data: any) => {

    try {
        let URI = `/lease`;
        let res: AxiosResponse<any> = await http.post(
            URI,
            data
        );
        await swal_success.fire('Estudio Previo de arrendamiento Creado', res.data.message, 'success');
        return res.data.results;

    } catch (e) {
        return Promise.reject('Error');
    }
};

const create_Loan = async (data: any) => {

    try {
        let URI = `/loan`;
        let res: AxiosResponse<any> = await http.post(
            URI,
            data
        );
        await swal_success.fire('Estudio Previo de Comodato Creado', res.data.message, 'success');
        return res.data;

    } catch (e) {
        return Promise.reject('Error');
    }
};
const create_public = async (data: any) => {

    try {
        let URI = `/public-use`;
        let res: AxiosResponse<any> = await http.post(
            URI,
            data
        );
        await swal_success.fire('Estudio previo de uso público creado', res.data.message, 'success');
        return res.data;

    } catch (e) {
        return Promise.reject('Error');
    }
};

export const create_precontract = async (data: any, type) => {

    switch (type) {
        case "Comodato":
            create_Loan(data);

            break;
        case "Arrendamiento":
            create_Lease(data);

            break;
        case "Publico":
            create_public(data);
            break;

        default:
            break;
    }
};

export const get_precontract = async (active_code) => {

    try {
        let URI = `/disposition`;
        let res: AxiosResponse<any> = await http.get(URI, {
            params: { active_code },
        });
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const inactivate_precontract = async (active_code) => {

    try {
        let URI = `/disposition`;
        let res: AxiosResponse<any> = await http.delete(URI, {
            params: { active_code },
        });
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const update_precontract = async (active_code, data: any) => {
    const final_data = {
        ...data,
    }
    try {
        let URI = `/disposition`;
        let res: AxiosResponse<any> = await http.put(URI,
            final_data,
            { params: { active_code }, }
        );

        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};
