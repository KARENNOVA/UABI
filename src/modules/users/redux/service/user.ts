import { AxiosResponse } from 'axios';
import { auth_http } from '../../../../config/axios_instances';
import { base64Encode, swal_warning } from '../../../../utils';

export interface AllUsersResponse {
    message: string;
    results: User[];
    page: number;
    count: number;
    next_page?: any;
    previous_page?: any;
    total_results: number;
}

export interface ListUsersResponse {
    message: string;
    results: User[];
}

export interface UserResponse {
    message: string;
    results: User;
}

export interface User {
    detailsUser: DetailsUser;
    roles: {
        id: number;
        name: string;
    }[];
    permits: {
        id: number;
        name: string;
    }[];
    key?: string;
}

export interface DetailsUser {
    id: number;
    society_type: string;
    entity_type: string;
    politics: boolean;
    notification: boolean;
    id_type: string;
    id_number: string;
    names: {
        firstName: string;
        lastName: string;
    };
    surnames: {
        firstSurname: string;
        lastSurname: string;
    };
    dependency?: string;
    subdependency?: string;
    email: string;
    location: string;
    cellphone_number: number;
    phone_number: number;
    gender: string;
    status?: string;
    audit_trail?: any;
}

export const get_all_users = async (filters?) => {
    try {
        // console.log('filtros', filters);
        const URI = '/users/list/';
        const res: AxiosResponse<AllUsersResponse> = await auth_http.get(URI, {
            params: {
                with: 'pagination',
                ...filters,
                // role: 1
            },
        });
        // const promesas = await Promise.all(
        //     res.data.results.map((r: any) => {
        //         const id = r.user_id;
        //         return get_user_by_id(id);
        //     })
        // )
        // res.data.results = res.data.results.map((r: any,i) => {
        //     return {...r, extra: promesas[i]}
        // })
        // console.log(res)
        return res.data;

    } catch (e) {
        return Promise.reject('Error');
    }
};

export const get_list_users = async () => {
    try {
        const URI = '/users/list/';
        const res: AxiosResponse<ListUsersResponse> = await auth_http.get(URI);
        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const create_user = async (_data) => {
    const body = await finalData(_data)
    try {
        const URI = '/users/';
        const res: AxiosResponse<UserResponse> = await auth_http.post(
            URI,
            body
        );
        return res.data;
    } catch (e) {
        if (e?.response) {
            if (e.response?.status === 422) {
                const messages =
                    e.response.data?.errors?.map((er) => {
                        let name = er.field.split('.');
                        name = name[name.length - 1];
                        let message = '';
                        switch (er.rule) {
                            case 'unique':
                                message = `El campo ${name} ya se encuentra registrado`;
                                break;
                            default:
                                message = `EL campo ${name} es incorrecto`;
                                break;
                        }
                        return message.replace('email', 'Correo Electronico');
                    }) || [];
                swal_warning.fire({
                    html: `<ul>
                         ${messages.map((d) => `<li>${d}</li>`)}
                    </ul>`,
                });
            }
            if (e.response?.status === 400) {
                swal_warning.fire({
                    text: e.response.data.message,
                });
            }
        }
        return Promise.reject('Error');
    }
};

export const get_user_by_id = async (id?, token?) => {
    try {
        const URI = `/users/`;
        const res: AxiosResponse<UserResponse> = await auth_http.get(URI, {
            params: { ...(id ? { id } : {}) },
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        return res.data.results;
    } catch (e) {
        return Promise.reject('Error');
    }
};

const finalData = async (_data) => {
    let pass = false;
    const data = Object.assign({}, _data);


    if (data.user) {
        if (data?.user?.password) {
            pass = await base64Encode(data.user.password);
        }
        // if (data.user.password === '') {
        delete data.user.password;
        // }
    }

    if (data.detailsUser) {
        delete data.detailsUser.id;
        delete data.detailsUser.politics;
        delete data.detailsUser.notification;
        delete data.detailsUser.status;
        delete data.detailsUser.audit_trail;
        delete data.detailsUser.str_location;
        delete data.detailsUser.id_number;
        delete data.detailsUser.dependency;
        delete data.detailsUser.subdependency;
        delete data.detailsUser.dependencies;
        if(typeof data.detailsUser.location !== 'number' ) {
            data.detailsUser.location = data.detailsUser.location.id
        }
        data.detailsUser.location = `${data.detailsUser.location}`
        // data.detailsUser.id_number = data.user.id_number+"";
        if (data.detailsUser.entity_type !== 'P') {
            data.detailsUser.cost_center_id = null
        }
    }

    const body = {
        ...data,
        user: {
            ...data.user,
            ...(pass ? { password: pass } : { password: '' }),
        },
    };
    return body;
}

export const update_user = async (id, data) => {


    const body: any = await finalData(data);
    const pass = body.user.password;
    delete body.user.password;


    try {
        const URI = '/users/';
        const res: AxiosResponse<UserResponse> = await auth_http.put(
            URI,
            body,
            {
                params: {
                    id,
                },
            }
        );

        if (pass) {
            const password: AxiosResponse<UserResponse> = await auth_http.put(
                '/users/password',
                { password: pass },
                {
                    params: {
                        id,
                    },
                }
            );
        }

        return res.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const assignRolesAndPermits = async (id, data) => {
    try {
        if (data.permits && data.roles_to_assign) {
            const r1 = await auth_http.post(
                '/roles/assign',
                { roles: data.roles_to_assign },
                {
                    params: {
                        to: id,
                    },
                }
            );
            const r2 = await auth_http.post(
                '/permits/assign',
                { permits: data.permits },
                {
                    params: { to: id },
                }
            );
            // await swal_success.fire({
            //     title: 'Usuario actualizado',
            //     text: 'Roles y Permisos asignados',
            //     icon: 'success',
            // });
        }
    } catch (e) {
        return Promise.reject('Error');
    }
};

export type Action = "inactivate" | "activate";

export const delete_user = async (id, action: Action) => {
    try {
        const URI = `/users/change-status`;
        const body = {}
        const res: AxiosResponse<UserResponse> = await auth_http.patch(
            URI,
            body,
            {
                params: {
                    id,
                    action
                },
            }
        );
        return res.data;

    } catch (e) {
            if (e?.response?.status === 400) {
            swal_warning.fire({ text: e.response.data.message, icon: 'error' });
            console.log(e.response.data);
        }
        return Promise.reject('Error');

    }
    // try {
    //     const URI = `/users/`;
    //     const res: AxiosResponse<UserResponse> = await auth_http.delete(URI, {
    //         params: { id },
    //     });
    //     return res.data;
    // } catch (e) {
    //     if (e?.response?.status === 400) {
    //         swal_warning.fire({ text: e.response.data.message, icon: 'error' });
    //         console.log(e.response.data);
    //     }
    //     return Promise.reject('Error');
    // }
};
