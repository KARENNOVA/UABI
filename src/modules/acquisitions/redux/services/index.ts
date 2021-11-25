import { location_http } from '../../../../config/axios_instances';
import { IAuditTrail, IDocumentResponse } from '../../../../utils/interfaces';

// PROJECTS
import projectsServices from './projects';

// REAL ESTATES
import realEstatesServices from './realEstates';
import { AxiosResponse } from 'axios';
import { IAddress } from '../../../../utils/interfaces';

interface IProps {
    id: number;
}

const getIdFromLocation = async ({
    city,
    state,
    country,
    commune,
    neighborhood,
}): Promise<number | string> => {
    console.log(5);
    try {
        if (city && state && country && commune && neighborhood) {
            const data = {
                city,
                state,
                country,
                commune,
                neighborhood,
            };

            let URI = '/localizations/id/';
            let res: AxiosResponse<IDocumentResponse<IProps>> =
                await location_http.get(URI, {
                    params: data,
                });
            return res.data.results.id;
        }
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const insertAddress = async (data: any) => {
    console.log(6, data);
    try {
        let URI = '/addresses/';
        let res: AxiosResponse<IDocumentResponse<any>> =
            await location_http.post(URI, {
                ...data,
            });
        return res.data.results;
    } catch (e) {
        return Promise.reject('Error');
    }
};

export const getAddressById = async (id) => {
    try {
        let URI = '/addresses/formated/';
        let res = await location_http.get(URI, { params: { id } });

        return res.data.results;
    } catch (e) {
        return Promise.reject('Error');
    }
};

const getAddress = async (values) => {
    console.log(4, values);
    let idLocation: any;
    try {
        idLocation = await getIdFromLocation({
            country: values.country,
            state: values.state,
            city: values.city,
            commune: values.commune,
            neighborhood: values.neighborhood,
        });
        let addressValues: any = {
            type: values.type,
            first_number: values.first_number,
            second_number: values.second_number,
            identifier: values.identifier,
            user_id: 'Administrador',
            location_id: idLocation,
        };

        if (values.first_appendix)
            addressValues.first_appendix = values.first_appendix;
        if (values.first_orientation)
            addressValues.first_orientation = values.first_orientation;
        if (values.second_appendix)
            addressValues.second_appendix = values.second_appendix;
        if (values.second_orientation)
            addressValues.second_orientation = values.second_orientation;
        if (values.block) addressValues.block = values.block;
        if (values.lot) addressValues.lot = values.lot;
        if (values.indications) addressValues.indications = values.indications;

        return await insertAddress(addressValues);
    } catch (error) {
        console.error(error);
        return Promise.reject('Error');
    }
};
//  localizations/lists
// const localizationsLists = async (filters) => {
//     try {
//         const URI = '/localizations/lists/';
//         let res = await location_http.get(URI, { params: { ...filters } });
//         return res.data.results;
//     } catch (e) {
//         return Promise.reject('Error');
//     }
// };

const services = {
    ...projectsServices,
    ...realEstatesServices,
    getAddress,
    insertAddress,
    getIdFromLocation,
};

export default services;
