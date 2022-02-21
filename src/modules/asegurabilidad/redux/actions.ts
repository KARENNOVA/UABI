import types from './types';
import service, { Broker, Company } from './service';
import { request_dispatch } from '../../../utils';

// const example = (filters = {}) =>
//     request_dispatch(types.example_type, service.example_service(filters));
const createPolicy = (dataPolicy) =>
    request_dispatch(types.policy, service.createPolicy(dataPolicy));

const getPolicy = (id: string) => {
    return request_dispatch(types.policy, service.getPolicy(id));
};
const getPolicies = (filters: {
    with?: string;
    page?: number;
    pageSize?: 10 | 20 | 30;
    q?: {};
}) => request_dispatch(types.policies, service.getPolicies(filters));

const clearPolicies = () =>
    request_dispatch(types.policies, Promise.resolve([]));

const clearPolicy = () =>
    request_dispatch(types.policy, Promise.resolve(null));

const updatePolicy = (data: any, id) =>
    request_dispatch(types.policy, service.updatePolicy(data, id));

const realEstatesPolicy = (id: number) =>
    request_dispatch(types.policiesRealEstate, service.realEstatesPolicy(id));

const getRealEstatesWithoutPolicy = (without: string, id_bis: [] ) =>
    request_dispatch(types.RealEstateWithoutPolicy, service.getRealEstatesWithoutPolicy(without, id_bis));
/*----------------Companies---------------------*/
const get_list_companies = () =>
    request_dispatch(types.get_list_companies, service.get_list_companies());
const get_all_companies = (filters?) =>
    request_dispatch(
        types.get_all_companies,
        service.get_all_companies(filters)
    );
const clear_all_companies = (filters?) =>
    request_dispatch(types.get_all_companies, Promise.resolve([]));


const create_company = (data: Company) =>
    request_dispatch(types.create_company, service.create_company(data));
const delete_company = (id) =>
    request_dispatch(types.delete_company, service.delete_company(id));
const get_company_by_id = (id) =>
    request_dispatch(types.get_company, service.get_company_by_id(id));
const update_company = (id, data: Company) =>
    request_dispatch(types.update_company, service.update_company(id, data));
const clear_company = () =>
    request_dispatch(types.clear_company, Promise.resolve(null));

/*----------------Brokers---------------------*/

const get_list_brokers = () =>
    request_dispatch(types.get_list_brokers, service.get_list_brokers());
const get_all_brokers = (filters?) =>
    request_dispatch(types.get_all_brokers, service.get_all_brokers(filters));
const clear_all_brokers = () =>
    request_dispatch(types.get_all_brokers, Promise.resolve([]));
const create_broker = (data: Broker) =>
    request_dispatch(types.create_broker, service.create_broker(data));
const delete_broker = (id) =>
    request_dispatch(types.delete_broker, service.delete_broker(id));
const get_broker_by_id = (id) =>
    request_dispatch(types.get_broker, service.get_broker_by_id(id));
const update_broker = (id, data: Broker) =>
    request_dispatch(types.update_broker, service.update_broker(id, data));
const clear_broker = () =>
    request_dispatch(types.clear_broker, Promise.resolve());

const actions = {
    // example
    createPolicy,
    getPolicy,
    getPolicies,
    updatePolicy,
    realEstatesPolicy,
    getRealEstatesWithoutPolicy,
    clearPolicies,
    clearPolicy,
    get_list_companies,
    get_all_companies,
    create_company,
    delete_company,
    clear_company,
    get_company_by_id,
    update_company,
    get_list_brokers,
    get_all_brokers,
    create_broker,
    delete_broker,
    get_broker_by_id,
    update_broker,
    clear_broker,
    clear_all_brokers,
    clear_all_companies
};

export default actions;
