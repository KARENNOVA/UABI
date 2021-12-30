import { AxiosResponse } from 'axios';
import { http } from '../../../../config/axios_instances';
import { swal, swal_success, swal_warning } from '../../../../utils';

import {
    IProjectAttributes,
    IProjectResponse,
    IProjectsResponse,
} from '../../../../utils/interfaces';

// REAL ESTATES
// Services: GET
export const getProject = async (
    id: string
): Promise<IProjectAttributes | string> => {
    try {
        let URI = `/projects`;
        let res: AxiosResponse<IProjectResponse> = await http.get(URI, {
            params: { id },
        });

        return res.data.results;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

const getProjects = async (filters): Promise<any | string> => {
    try {
        let URI = `/projects/list`;
        let res: AxiosResponse<IProjectsResponse> = await http.get(URI, {
            params: {
                ...filters,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

// Services: POST
export const createProject = async (
    values
): Promise<IProjectAttributes | string> => {
    try {
        const aux_values = { ...values };
        delete aux_values.id;
        let URI = `/projects`;
        let res: AxiosResponse<IProjectResponse> = await http.post(URI, {
            ...aux_values,
        });

        await swal_success.fire('Proyecto creado', res.data.message, 'success');

        return res.data.results;
    } catch (error) {
        console.error(error);
        await swal_warning.fire('Error', '', 'error');

        return Promise.reject('Error');
    }
};

// Services: PUT
export const updateProject = async (data: any, id: number) => {
    try {
        let URI = `/projects`;
        return await http.put(URI, data, {
            params: { id },
        });
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

export const deleteProject = async (id: number) => {
    try {
        let URI = `/projects/delete/`;
        let res: AxiosResponse<IProjectResponse> = await http.delete(URI, {
            params: { id },
        });

        swal_warning.fire({
            title: 'Proyecto Inactivado',
            text: res.data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
        });

        return res.data;
    } catch (error) {
        if (error?.response && error.response?.status === 400) {
            await swal_warning.fire(
                'No se pudo inactivar',
                error.response?.data?.message || 'Error',
                'warning'
            );
        }
        return Promise.reject('Error in delete Project');
    }
};

const services = {
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};

export default services;
