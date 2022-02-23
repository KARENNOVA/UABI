import { AxiosResponse } from 'axios';
import { getAddressById, insertAddress } from '.';
import { http } from '../../../../config/axios_instances';
import { swal_success, swal_warning } from '../../../../utils';
import {
    createAcquisitionForRealEstate,
    getAcquisitionForRealEstate,
    updateAcquisition,
} from './acquisitions';
import {
    IPaginable,
    IRealEstateAttributes,
    IRealEstateResponse,
    ITipologiesResponse,
} from '../../../../utils/interfaces';
import { get_documents_by_ids } from '../../../../utils/components/DocumentsModal/services';
import {
    compute_docs,
    upload_documents,
} from '../../views/RealEstate/realEstate.utils';
import { Action } from '../../../users/redux/service';

// REAL ESTATES
// Services: GET
const getRealEstates = async (filters?) => {
    try {
        // console.log('filtros', filters);
        let URI = `/real-estates/list/`;
        let res: AxiosResponse<IPaginable<IRealEstateAttributes>> =
            await http.get(URI, {
                params: {
                    ...filters,
                },
            });
        //console.log(res);
        return res.data;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

export const getRealEstatesByProject = async (
    id: number,
    filters?
): Promise<IPaginable<IRealEstateAttributes> | string> => {
    if (Number.isInteger(id)) {
        try {
            let URI = `/real-estates/project/`;
            let res: AxiosResponse<IPaginable<IRealEstateAttributes>> =
                await http.get(URI, {
                    params: { id, ...filters },
                });
            return res.data;
        } catch (error) {
            console.error(error);
            return Promise.reject('Error');
        }
    }
};

export const getRealEstate = async (
    id: string
): Promise<IRealEstateAttributes | string> => {
    try {
        let URI = `/real-estates`;
        let res: AxiosResponse = await http.get(URI, {
            params: { id },
        });
        // res.data.results.active_type = res.data.results.active_type.split(', ');
        res.data.results.acquisitions = await getAcquisitionForRealEstate(id);
        res.data.results.supports_documents = await get_docucments_whit_service(
            res.data.results.supports_documents
        );
        return res.data.results;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

const get_docucments_whit_service = async (docs) => {
    try {
        if (!Array.isArray(docs) && typeof docs === 'string') {
            docs = docs.split(',');
        }
        docs = docs.filter((n) => !!n);
        if (Array.isArray(docs) && docs.length > 0) {
            const doc_ids = docs.join(',');
            let documents: any = await get_documents_by_ids(doc_ids);
            return documents.map((doc) => ({
                ...doc,
                label:
                    doc.type === 3
                        ? 'Documento de Matricula'
                        : doc.type === 4
                        ? 'Documento de Titulo'
                        : doc.type === 6
                        ? 'Documento Avalúo'
                        : doc.type === 7
                        ? 'Documento de Prediación'
                        : 'Anexo',
            }));
        }
        return [];
    } catch (e) {
        return Promise.reject('Error');
    }
};
const finalData = (data, docs_ids?) => {
    const aux_data = {
        ...data,
        // ...(Array.isArray(data.active_type)
        //     ? { active_type: data.active_type.join(', ') }
        //     : {}),
    };
    delete aux_data.id;
    delete aux_data.status;
    delete aux_data.status_name;
    delete aux_data.last_consecutive;
    delete aux_data.acquisitions;
    delete aux_data.audit_trail;
    delete aux_data.registry_number_document_id;
    delete aux_data.accounting_account;
    delete aux_data.tipology;
    console.log(aux_data.type);
    if (!aux_data.type) {
        delete aux_data.sap_id;
        delete aux_data.active_code;
    } else {
        delete aux_data.type;
    }

    if (aux_data.construction_area === '') {
        aux_data.construction_area = null;
    }
    if (aux_data.plot_area === '') {
        aux_data.plot_area = 0;
    }
    if (aux_data.cost_center_id) {
        aux_data.cost_center_id = Number(aux_data.cost_center_id);
    }
    if (aux_data.projects_id) {
        aux_data.projects_id[0] = Number(aux_data.projects_id[0]);
    }
    if (aux_data.patrimonial_value === '') {
        aux_data.patrimonial_value = 0;
    }

    delete aux_data.fixed_assets;
    delete aux_data._address;
    delete aux_data.dependency_id;
    delete aux_data.supports_documents;
    // if (aux_data.project?.id !== "0") {
    delete aux_data.dependency;
    delete aux_data.subdependency;
    delete aux_data.cost_center;
    delete aux_data.management_center;
    // }
    delete aux_data.project;
    delete aux_data._project;
    return aux_data;
};
// Services: POST
export const createRealEstate = async (
    data: any
): Promise<IRealEstateAttributes | string> => {
    console.log('servicio antes', data);
    const aux_data = finalData(data);
    console.log('servicio despues', aux_data);
    try {
        let URI = `/real-estates`;
        const docs: any = await compute_docs(data.supports_documents);
        let res: AxiosResponse<IRealEstateResponse>;
        if (docs) {
            res = await http.post(URI, aux_data);
            const docs_ids = await upload_documents(docs, res.data.results.id);

            await http.put(
                URI,
                { supports_documents: docs_ids || '' },
                {
                    params: { id: res.data.results.id },
                }
            );
            console.log('enviar', res);
        }
        return res?.data?.results || '';
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

//TODO: Crear realEstates englobe - desenglobe
export const createRealEstates = async (
    data: any,
    fathers: any[],
    action,
    quantity
) => {
    console.log('crear', data);
    let realEstates = [];
    const docs = await Promise.all(
        data.map(async (d) => {
            return await compute_docs(d.supports_documents);
        })
    );
    data.map((d) => realEstates.push(finalData(d)));
    realEstates.map((dr) => {
        if (dr.plot_area === '') {
            dr.plot_area = 0;
        }
        if (action !== 'divide') {
            delete dr.value;
            delete dr.key;
            delete dr.project_id;
        }
    });
    // const data_fathers = fathers.map(f => {
    //     return {
    //         id: f.id,
    //         status:
    //             action === "englobar" ?
    //                 f.type === "lote" ?
    //                     f.plot_area === 0 ? 4 : 6
    //                     : f.type === "constrution" &&
    //                         f.construction_area === 0 ? 4 : 6
    //             : action === "desenglobar" &&
    //                 f.type === "lote" ?
    //                     f.plot_area === 0 ? 5 : 7
    //                     : f.type === "constrution" &&
    //                         f.construction_area === 0 ? 5 : 7
    //         ,
    //         ...f

    //     }
    // })
    const data_final = { realEstateFather: fathers, realEstates };
    console.log(data_final);

    try {
        let URI = `/real-estates`;
        let res: AxiosResponse<any> = await http.post(URI, data_final, {
            params: {
                quantity,
                action:
                    action === 'englobar'
                        ? 'bundle'
                        : action === 'desenglobar'
                        ? 'unbundle'
                        : action,
            },
        });

        const docs_ids = await Promise.all(
            docs.map(async (d, i) => {
                return await upload_documents(d, res.data.results[i].id);
            })
        );

        const project = res.data.results.project;

        delete res.data.results.project;

        const results = Object.values(res.data.results);

        const assing_doc = results.map((r: any, i) => {
            return http.put(
                URI,
                { supports_documents: docs_ids[i] || '' },
                {
                    params: { id: r.id },
                }
            );
        });

        await Promise.all(assing_doc).then((res) => {
            console.log(res);
        });

        // res.data.results.map(result => {

        // })
        // await http.put(
        //     URI,
        //     { supports_documents: docs_ids || '' },
        //     {
        //         params: { id: res.data.results.id },
        //     }
        // );

        return res.data.results;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

//TODO: Editar BIs englobe
export const updateRealEstates = async (data: any) => {
    data = data.map((d) => {
        return {
            ...d,
            projects_id: [d.project.id],
            active_type: d.active_type.split(', '),
            materials: d.materials.join(),
        };
    });
    try {
        console.log('bienes inmuebles a actualizar', data);
        let URI = `/real-estates`;
        const res: any = await Promise.all(
            data.map((r: any, i) => {
                console.log(r);
                const body = finalData(r);
                return http.put(URI, body, {
                    params: { id: r.id },
                });
            })
        );

        return res.data.results;
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

// Services: PUT
export const updateRealEstate = async (data: any, id: number) => {
    try {
        let URI = `/real-estates`;
        const docs: any = await compute_docs(data.supports_documents);
        if (docs) {
            const body = finalData(data);
            let res: AxiosResponse<IRealEstateResponse> = await http.put(
                URI,
                body,
                {
                    params: { id },
                }
            );
            const docs_ids = await upload_documents(docs, res.data.results.id);
            await http.put(
                URI,
                { supports_documents: docs_ids || '' },
                {
                    params: { id },
                }
            );
            swal_success.fire({
                title: 'Bien Inmueble actualizado.',
                text: res.data.message,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });
            res.data.results.supports_documents =
                await get_docucments_whit_service(
                    res.data.results.supports_documents
                );
            return res.data.results;
        } else {
            return Promise.resolve(false);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};

export const getIdFromLocation = async ({
    city,
    state,
    country,
    commune,
    neighborhood,
}) => {
    try {
        let URI = '/localizations/id/';
        let res = await http.get(URI, {
            params: { city, state, country, commune, neighborhood },
        });
        return res.data.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

const getAddress = async (values) => {
    try {
        const res1 = await getIdFromLocation({
            city: values.municipio,
            state: values.departamento,
            country: values.pais,
            commune: values.commune,
            neighborhood: values.barrio,
        });
        const res2 = await insertAddress({
            type: values.tipo,
            number_one: values.numero1,
            word_one: values.letra1,
            number_two: values.numero2,
            indicative: values.indicativo,
            user_id: '',
            location_id: res1.id,
        });
        const res3 = await getAddressById(res2.id);
        return res3.data.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

const deleteRealEstate = async (id, action: Action) => {
    try {
        const URI = `/real-estates/change-status`;
        const body = {};
        const res: AxiosResponse<IRealEstateResponse> = await http.patch(
            URI,
            body,
            {
                params: {
                    id,
                    action,
                },
            }
        );

        swal_success.fire({
            title: 'Bien Inmueble Inactivado',
            text: res.data.message,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
        });

        return res.data;
    } catch (error) {
        console.error(error);
        swal_warning.fire({
            title: 'Error al inactivar Bien Inmueble',
            text: error.message,
            icon: 'error',
            showConfirmButton: false,
        });
        return Promise.reject('Error in delete real estate');
    }
};

const getTipologies = async () => {
    try {
        let URI = '/tipologies';
        let res: AxiosResponse<ITipologiesResponse> = await http.get(URI);
        return res.data.results;
    } catch (error) {
        return Promise.reject('Error in get tipologies');
    }
};

const getTipology = async (id) => {
    try {
        let URI = '/tipologies';
        let res: AxiosResponse<ITipologiesResponse> = await http.get(URI, {
            params: {
                id,
            },
        });
        return res.data.results;
    } catch (error) {
        return Promise.reject('Error in get tipology');
    }
};

const services = {
    getRealEstates,
    getRealEstatesByProject,
    getRealEstate,
    createRealEstate,
    createRealEstates,
    updateRealEstate,
    updateRealEstates,
    getAddress,
    deleteRealEstate,
    createAcquisitionForRealEstate,
    getAcquisitionForRealEstate,
    getTipologies,
    getTipology,
    updateAcquisition,
};

export default services;
