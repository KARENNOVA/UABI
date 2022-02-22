import { AxiosResponse } from 'axios';
import { http } from '../../../../config/axios_instances';
import { swal_success, swal_warning } from '../../../../utils';

import {
    IProjectAttributes,
    IProjectResponse,
    IProjectsResponse,
} from '../../../../utils/interfaces';
import moment from "moment";

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
        res.data.results.contracts = res.data.results.contracts?.map(c => {
            // console.log("contracts", c);
            return {
                ...c,
                validity: {
                    start_date: moment(parseInt(c.vigency_start)).format('YYYY/MM/DD'),
                    end_date: moment(parseInt(c.vigency_end)).format('YYYY/MM/DD')
                }
            }
        })
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
        delete aux_values.dependency;
        delete aux_values.subdependency;
        delete aux_values.cost_center;
        delete aux_values.management_center;
        delete aux_values.vigency_end;
        delete aux_values.vigency_start;


        let contratos = [];
        aux_values.contracts?.map(c => {
            const contract = {
                ...c,
                validity: {
                    end_date: new Date(moment(c.validity.end_date).format('YYYY/MM/DD')).getTime(),
                    start_date: new Date(moment(c.validity.start_date).format('YYYY/MM/DD')).getTime()
                }
            }
            contratos.push(contract)
        })

        aux_values.contracts = contratos


        let URI = `/projects`;
        let res: AxiosResponse<IProjectResponse> = await http.post(URI, {
            ...aux_values,
        });

        await swal_success.fire('Proyecto creado', res.data.message, 'success');

        return res.data.results;
    } catch (error) {
        console.error(error);
        if(error?.response ) {
            if (error.response?.status === 400) {
                await swal_warning.fire({
                    text: "El campo Nombre del proyecto ya se encuentra registrado"
                });

            }

        }

        // await swal_warning.fire('Error', '', 'error');

        return Promise.reject('Error');
    }
};

// Services: PUT
export const updateProject = async (data: any, id: number) => {
    let contratos = [];
    data.contracts?.map(c => {
        if (typeof c.validity.end_date === "string") {
            // console.log('entro')
            const contract = {
                ...c,
                validity: {
                    end_date: new Date(moment(c.validity.end_date).format('YYYY/MM/DD')).getTime(),
                    start_date: new Date(moment(c.validity.start_date).format('YYYY/MM/DD')).getTime()
                }
            }
            contratos.push(contract)
        } else {
            const contract = {...c}
            contratos.push(contract)
        }
    })
    delete data.dependency;
    delete data.subdependency;
    delete data.management_center;
    delete data.cost_center;

    data.contracts = contratos
    data.cost_center_id = Number(data.cost_center_id)




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


const getDependencies = async () => {
    try {
        let URI = `/dependencies`;
        let res: AxiosResponse<IProjectsResponse> = await http.get(URI);
        return res.data.results;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

const services = {
    getProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getDependencies,
};

export default services;
