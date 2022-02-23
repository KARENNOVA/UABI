import { request_dispatch } from '../../../../utils';
import types from '../types';
import service from '../services';
import { AdquisitionsItf } from '../../../../utils/interfaces';
import { Action } from '../../../users/redux/service';

// REAL ESTATES
export const getRealEstates = (filters) => {
    //console.log('action:', filters.q);
    return request_dispatch(types.realEstates, service.getRealEstates(filters));
};

export const getRealEstatesByProject = (id, filters?) => {
    return request_dispatch(
        types.realEstates,
        service.getRealEstatesByProject(id, filters)
    );
};

export const getRealEstate = (id: string) =>
    request_dispatch(types.realEstate, service.getRealEstate(id));

export const createRealEstate = (data) =>
    request_dispatch(types.realEstate, service.createRealEstate(data));

export const createRealEstates = (data, fathers, action, quantity) =>
    request_dispatch(
        types.realEstates,
        service.createRealEstates(data, fathers, action, quantity)
    );

export const updateRealEstates = (data) =>
    request_dispatch(types.realEstates, service.updateRealEstates(data));

export const updateRealEstate = (data, id) =>
    request_dispatch(types.realEstate, service.updateRealEstate(data, id));

export const deleteRealEstate = (id, action: Action) =>
    request_dispatch(
        types.deleteRealEstate,
        service.deleteRealEstate(id, action)
    );

export const createAcquisitionForRealEstate = (
    id,
    acquisitions: AdquisitionsItf[]
) =>
    request_dispatch(
        types.acquisition_create,
        service.createAcquisitionForRealEstate(id, acquisitions)
    );

export const updateAcquisition = (id, acquisitions: AdquisitionsItf[]) =>
    request_dispatch(
        types.acquisition_create,
        service.updateAcquisition(id, acquisitions)
    );

export const clearRealEstates = () =>
    request_dispatch(types.realEstates, Promise.resolve([]));

export const clearRealEstate = () =>
    request_dispatch(types.realEstate, Promise.resolve(null));

export const getTipologies = () =>
    request_dispatch(types.tipologies, service.getTipologies());

export const getTipology = (id) =>
    request_dispatch(types.tipology, service.getTipology(id));
